import aiofiles
import os
import re
import mimetypes
import fleep
import pathlib
import pikepdf
from aioify import aioify
from enum import Enum
from pdf2docx import parse
from fastapi.logger import logger
from string import printable
from docx import Document
from docx.opc.exceptions import PackageNotFoundError


class PdfTypes(Enum):
    PDF1 = 'application/pdf'
    PDF2 = 'application/x-pdf'


def is_pdf_file(filepath):
    try:
        with open(filepath, "rb") as file:
            info = fleep.get(file.read(128))
            mime_type, _ = mimetypes.guess_type(filepath)
        check1 = info.type_matches("document")
        check2 = (pathlib.Path(filepath).suffix in ['.pdf'])
        check3 = \
            info.mime_matches(PdfTypes['PDF1'].value) \
            or info.mime_matches(PdfTypes['PDF2'].value)
        check4 = 'pdf' in mime_type
        return all([check1, check2, check3, check4])
    except (TypeError, PermissionError):
        return False


def is_small_file_by_pages(filepath):
    try:
        if is_pdf_file(filepath):
            with pikepdf.open(filepath) as pdf:
                if len(pdf.pages) <= 100:
                    return True
        return False
    except (TypeError, PermissionError):
        return False


def is_small_file_by_bytes(filepath):
    try:
        if 10485760 > os.path.getsize(filepath):
            return True
        return False
    except (TypeError, PermissionError):
        return False


def delete_bad_files(in_filepath):
    check1 = not is_pdf_file(in_filepath)
    check2 = not is_small_file_by_pages(in_filepath)
    check3 = not is_small_file_by_bytes(in_filepath)
    if any([check1, check2, check3]):
        os.remove(in_filepath)
        logger.info(f'{in_filepath} removed')
        return
    return in_filepath


@aioify
def pdf_process(in_filepath):
    try:
        in_filepath = delete_bad_files(in_filepath)
        if in_filepath:
            docx_path = in_filepath.replace('.pdf', '.docx')
            parse(in_filepath, docx_path)
            return docx_path
        else:
            return ""
    except (TypeError, PermissionError):
        return


@aioify
async def save_upload_file(customfile):
    file_location = pathlib.Path('UPLOAD', customfile.filename)
    async with aiofiles.open(file_location, "wb+") as f:
        await f.write(customfile.file.read())
    return str(file_location)


def filter_nonprintable(text):
    nonprint = set([chr(i) for i in range(128)]).difference(printable)
    return text.translate({ord(character): None for character in nonprint})


def filter_paragraph(s):
    return '\n'.join(
        str.split(re.sub(r'\s{2,}', ' ',
                         re.sub(r'\n\n', '|\n',
                                s.replace('::', ':'))), '|')).replace(':', ':')


@aioify
def get_file_content(file_path):
    try:
        doc = Document(file_path)
        lst = []
        for paragraph in doc.paragraphs[:25]:
            lst.append(filter_paragraph(filter_nonprintable(paragraph.text)))
        return " ".join(lst).strip()[:1000]
    except PackageNotFoundError:
        return ""
