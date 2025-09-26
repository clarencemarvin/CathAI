from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_PORT: int = 8000
    API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()