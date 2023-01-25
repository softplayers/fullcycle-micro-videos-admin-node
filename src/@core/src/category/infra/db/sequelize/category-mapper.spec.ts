import { Category } from "#category/domain";
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import { Sequelize } from "sequelize-typescript";
import { CategoryModelMapper } from "./category-mapper";
import { CategoryModel } from "./category-model";
import { CategorySequelizeRepository } from "./category-repository";

describe("CategoryModelMapper Unit Tests", () => {

    setupSequelize({models: [CategoryModel] });

    it('should throw error when category is invalid', () => {
        const model = CategoryModel.build({id: '011a2da2-70e3-4a0a-b6fc-42e9ad976963'});
        
        // expect(() => CategoryModelMapper.toEntity(model)).toThrowError(LoadEntityError);

        try {
            CategoryModelMapper.toEntity(model);
            fail('The category is valid, but LoadEntityError is expected');
        }
        catch(e) {
            expect(e).toBeInstanceOf(LoadEntityError);
            expect(e.error).toMatchObject({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters"
                ],
            })
        }
    })

    it('should handle a generic error', () => {
        const error = new Error('Generic Error to cover 100% lines of code');
        const spyValidate = jest
            .spyOn(Category, 'validate')
            .mockImplementation(() => {throw error;});

        const model = CategoryModel.build({id: '011a2da2-70e3-4a0a-b6fc-42e9ad976963'});
        expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
        expect(spyValidate).toHaveBeenCalled();
        spyValidate.mockRestore();
    })

    it ('should convert a category model to a category entity', () => {
        const created_at = new Date();

        const model = CategoryModel.build({
            id: '011a2da2-70e3-4a0a-b6fc-42e9ad976963',
            name: 'some name',
            description: 'some description',
            is_active: true,
            created_at,
        });

        const entity = CategoryModelMapper.toEntity(model);

        const expectedModel = new Category({
            name: 'some name',
            description: 'some description',
            is_active: true,
            created_at,
        }, new UniqueEntityId('011a2da2-70e3-4a0a-b6fc-42e9ad976963'));

        expect(entity.toJSON()).toStrictEqual(expectedModel.toJSON());

    })
});
