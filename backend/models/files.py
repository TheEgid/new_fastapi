import sqlalchemy

metadata = sqlalchemy.MetaData()

files_table = sqlalchemy.Table(
    "files",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user_hidden_name", sqlalchemy.String(100)),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime()),
    sqlalchemy.Column("filename", sqlalchemy.String(100)),
    sqlalchemy.Column("content", sqlalchemy.Text()),
    sqlalchemy.Column("type", sqlalchemy.String(100)),
)
