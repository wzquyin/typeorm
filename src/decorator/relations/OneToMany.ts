import {
    RelationTypeInFunction, PropertyTypeInFunction,
    RelationMetadata
} from "../../metadata-builder/metadata/RelationMetadata";
import {RelationOptions} from "../../metadata-builder/options/RelationOptions";
import {RelationTypes} from "../../metadata-builder/types/RelationTypes";
import {defaultMetadataStorage} from "../../metadata-builder/MetadataStorage";

export function OneToMany<T>(typeFunction: RelationTypeInFunction, options?: RelationOptions): Function;
export function OneToMany<T>(typeFunction: RelationTypeInFunction, inverseSide?: PropertyTypeInFunction<T>, options?: RelationOptions): Function;
export function OneToMany<T>(typeFunction: RelationTypeInFunction,
                             inverseSideOrOptions: PropertyTypeInFunction<T>|RelationOptions,
                             options?: RelationOptions): Function {
    let inverseSide: PropertyTypeInFunction<T>;
    if (typeof inverseSideOrOptions === "object") {
        options = <RelationOptions> inverseSideOrOptions;
    } else {
        inverseSide = <PropertyTypeInFunction<T>> inverseSideOrOptions;
    }

    return function (object: Object, propertyName: string) {

        // todo: type in function validation, inverse side function validation
        if (!options)
            options = {};

        const metadata = new RelationMetadata(
            object.constructor, propertyName, RelationTypes.ONE_TO_MANY, typeFunction, inverseSide, false, options
        );
        defaultMetadataStorage.addRelationMetadata(metadata);
    };
}
