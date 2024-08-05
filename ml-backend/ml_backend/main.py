import uvicorn

if __name__ == "__main__":
    # todo set reload = false in prod
    uvicorn.run("app.app:app", host="0.0.0.0", port=8000, reload=True)