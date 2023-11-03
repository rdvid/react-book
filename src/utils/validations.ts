export abstract class BaseValidator {

    static isEmail(email: string){
        const regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if(!regex.test(email)){
            return false;
        }
        return true;
    }

    static nameLengthValidator(file: File) {
        if (file.size > 500000) {
          return {
            code: "file-too-large",
            message: `whoah what a great file. Sorry but we can't handle it....yet`
          };
        }
        return null;
    }

}