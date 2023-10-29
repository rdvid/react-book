import { InputHTMLAttributes } from "react";

export abstract class BaseValidation {


    static hasValue(field: string){
        if(!field){
            return false;
        }
        return true;
    }

}