import sys
import pathlib


sys.path.append(str(pathlib.Path.cwd()))
sys.path.append(str(pathlib.Path.cwd() / 'backend'))

# This sets `os.environ`,
# If we placed it below the application import, it would raise an error
# informing us that 'TESTING' had already been read from the environment.
# os.environ['TESTING'] = 'True'

# from alembic import command
# from alembic.config import Config
# from sqlalchemy_utils import create_database, drop_database
#
# sys.path.append(os.path.abspath('../'))
#
#
# @pytest.fixture(scope="module")
# def temp_db():
#     """ Create new DB for tests """
#     create_database(database.TEST_SQLALCHEMY_DATABASE_URL)
#     base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
#     alembic_cfg = Config(os.path.join(base_dir, "alembic.ini"))
#     command.upgrade(alembic_cfg, "head")
#     # drop_database(database.TEST_SQLALCHEMY_DATABASE_URL)
#     try:
#         yield database.database.TEST_SQLALCHEMY_DATABASE_URL
#     finally:
#         drop_database(database.database.TEST_SQLALCHEMY_DATABASE_URL)
