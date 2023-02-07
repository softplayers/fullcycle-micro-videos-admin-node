import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import { CreateCategoryUseCase } from "../../create-category.use-case";

const { CategoryRepository, CategoryModel } = CategorySequelize;

describe('CreateCategoryUseCase Integration tests', () => {
    let useCase: CreateCategoryUseCase.UseCase;
    let repository: CategorySequelize.CategoryRepository;

    setupSequelize({models: [CategoryModel]})

    beforeEach(() => {
        repository = new CategoryRepository(CategoryModel);
        useCase = new CreateCategoryUseCase.UseCase(repository);
    });

    it('should create a category', async () => {
        let output = await useCase.execute({ name: 'test' });
        let entity = await repository.findById(output.id);
       
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: entity.created_at,
        });

        output = await useCase.execute({ name: 'test', description: 'some description' });
        entity = await repository.findById(output.id);
       
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: 'some description',
            is_active: true,
            created_at: entity.created_at,
        });

        output = await useCase.execute({ name: 'test', description: 'some description', is_active: false });
        entity = await repository.findById(output.id);

        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: 'some description',
            is_active: false,
            created_at: entity.created_at,
        });
    });

    describe('should create categories with test.each', () => {
        const arrange = [
            {inputProps: {name: 'test'},
             outputProps: {
                name: 'test',
                description: null,
                is_active: true,
             }}
        ]

        test.each(arrange)('input $inputProps, output $outputProps', async ({inputProps, outputProps}) => {
            let output = await useCase.execute(inputProps);
            let entity = await repository.findById(output.id);
            expect(output.id).toBe(entity.id);
            expect(output.created_at).toStrictEqual(entity.created_at);
            expect(output).toMatchObject(outputProps);
        })

    })
})
