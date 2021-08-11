#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$DB_USER" --dbname="$POSTGRES_DB"<<-EOSQL
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
