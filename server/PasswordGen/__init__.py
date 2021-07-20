import string
import random


class PasswordGen:
    def __init__(self):
        self.lowercase = string.ascii_lowercase
        self.uppercase = string.ascii_uppercase
        self.digits = string.digits
        self.special_char = string.punctuation

    def gen(self, length: int = 6,
            caps: bool = True,
            digits: bool = True,
            special_char: bool = True,
            rate: int = 6):
        charSet = self.genSet(caps=caps, digits=digits,
                              special_char=special_char)
        passwd = self.genPswd(charSet=charSet, length=length, rate=rate)

        return passwd

    def genSet(self, caps: bool = True,
               digits: bool = True,
               special_char: bool = True):

        if all([caps, digits, special_char]):
            return self.lowercase + self.uppercase + self.digits + self.special_char

        else:
            charSet = []
            charSet += self.lowercase
            if caps:
                charSet += self.uppercase
            elif digits:
                charSet += self.digits
            elif special_char:
                charSet += self.special_char

            return charSet

    def genPswd(self, charSet: list, length: int = 6, rate: int = 8):
        pswd = []

        for char in range(length):
            _listPass = []
            for i in range(rate):
                _listPass.append(random.choice(
                    [random.choice(charSet), random.choice(charSet), random.choice(charSet), random.choice(charSet),
                     random.choice(charSet), random.choice(
                         charSet), random.choice(charSet),
                     random.choice(charSet)]))

            pswd.append(random.choice(_listPass))

        return ''.join(pswd)


if __name__ == '__main__':
    n = PasswordGen()
    pswd = n.gen(length=20, rate=8, caps=False, digits=True, special_char=True)
