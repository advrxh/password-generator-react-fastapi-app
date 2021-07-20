import fastapi
from fastapi.middleware.cors import CORSMiddleware

import sys

GEN_MODULE_PATH = r"" # add ur path to ur gen module

sys.path.insert(1, GEN_MODULE_PATH )

from PasswordGen import PasswordGen

app = fastapi.FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gen = PasswordGen()


@app.get("/")
async def redirect():
    return fastapi.responses.RedirectResponse(url="/genPswd", status_code=200)


@app.get("/gen")
async def gen_pswd(len: int = 6, caps: bool = False, digits: bool = True, spcl_char: bool = True):
    pswd = gen.gen(length=len, caps=caps, digits=digits,
                   special_char=spcl_char)

    return {
        "data": {
            "password": pswd,
            "attributes": {
                "length": len,
                "hasCaps": caps,
                "hasDigits": digits,
                "hasSpecialChars": spcl_char
            }
        },
        "msg": "password_gen_ok",
        "status_code": fastapi.status.HTTP_200_OK
    } if pswd else {
        "msg": "password_gen_faill",
        "status_code": fastapi.status.HTTP_417_EXPECTATION_FAILED
    }
