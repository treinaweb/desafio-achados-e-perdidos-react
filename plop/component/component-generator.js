module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'Componente',
        prompts: [
            {
                name: 'name',
                type: 'input',
                message: 'Nome do Componente: ',
            },
            {
                name: 'type',
                type: 'list',
                message: 'Tipo do Componente: ',
                choices: [
                    {
                        name: 'Data Display',
                        value: 'data-display',
                    },
                    {
                        name: 'Feedback',
                        value: 'feedback',
                    },
                    {
                        name: 'Inputs',
                        value: 'inputs',
                    },
                    {
                        name: 'Layout',
                        value: 'layout',
                    },
                    {
                        name: 'Navigation',
                        value: 'navigation',
                    },
                    {
                        name: 'Surfaces',
                        value: 'surfaces',
                    },
                ],
            },
        ],
        actions(data) {
            const basePath = `src/ui/components/${data.type}/${data.name}/`;
            const actions = [
                {
                    type: 'add',
                    path: `${basePath}/${data.name}.tsx`,
                    templateFile: 'plop/component/component-template.hbs',
                },
                {
                    type: 'add',
                    path: `${basePath}/${data.name}.style.tsx`,
                    templateFile: 'plop/component/component-style-template.hbs',
                },
            ];

            return actions;
        },
    });
};
