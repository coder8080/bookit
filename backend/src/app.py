from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from src.api import router
from src.config import settings
from src.limiter import limiter

instrumentator = Instrumentator()

app = FastAPI(
    debug=settings.DEBUG,
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    swagger_ui_parameters=settings.SWAGGER_UI_PARAMETERS,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore

app.include_router(router)

app.state.limiter = limiter

instrumentator.instrument(app).expose(app)


@app.get("/", include_in_schema=False)
@limiter.limit(settings.API_RATE_LIMIT)
def root(request: Request):
    return Response(status_code=status.HTTP_200_OK)
