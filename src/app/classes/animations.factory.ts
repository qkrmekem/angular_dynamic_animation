import { animate, AnimationBuilder, AnimationStyleMetadata, style } from "@angular/animations";
import { inject } from "@angular/core";
import { CustomAnimationDefinition } from "../reusable-animation-test/reusable-animation-test.component";


export class AnymationCreateFactory{
    builder = inject(AnimationBuilder);

    createAnimation(param: CustomAnimationDefinition){
        console.log('파람',param.style);
        const result = this.builder.build([animate(`${param.time}s`, style(param.style))]);
        console.log('빌드', result);
        
        return result;
    }
}