interface HomeForm {
  email: string;
  title: string;
  author: string;
}


export abstract class BaseValidator {

    static isEmail(email: string){
        const regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if(!regex.test(email)){
            return false;
        }
        return true;
    }

    static fileSizeValidator(file: File) {
        if (file.size > 500000) {
          return {
            code: "file-too-large",
            message: `whoah what a great file. Sorry but we can't handle it....yet`
          };
        }
        return null;
    }

    static canSubmit(form: HomeForm){
      
      if(!this.isEmail(form.email)){
        return false;
      }

      if(!form.title || form.title.length > 100){
        return false;
      }

      if(!form.author || form.author.length > 100){
        return false;
      }

      return true;
    }

}