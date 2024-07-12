import contextlib

from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette_graphene3 import GraphQLApp, make_graphiql_handler

import setup
from schema import schema
from models import Column, Task

app = Starlette(
    middleware=[Middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])]
)
app.mount("/", GraphQLApp(schema, on_get=make_graphiql_handler()))  # Graphiql IDE
