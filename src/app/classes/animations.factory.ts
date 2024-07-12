import { animate, AnimationBuilder, AnimationStyleMetadata } from "@angular/animations";
import { inject } from "@angular/core";
import { CustomAnimationDefinition } from "../reusable-animation-test/reusable-animation-test.component";


export class AnymationCreateFactory{
    builder = inject(AnimationBuilder);

    createAnimation(parma: CustomAnimationDefinition){
        return this.builder.build([animate(parma.time, parma.style)]);
    }
}