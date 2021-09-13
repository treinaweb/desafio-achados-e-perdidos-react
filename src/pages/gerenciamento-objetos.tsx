import React from 'react';
import { GetStaticProps } from 'next';
import { Button, Container, Snackbar, Typography } from '@material-ui/core';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Table, {
    TableCell,
    TableRow,
} from 'ui/components/data-display/Table/Table';
import Link from 'ui/components/navigation/Link/Link';
import { Box } from '@material-ui/system';
import useGerenciamentoObjetos from 'data/hooks/pages/useGerenciamentoObjetos.page';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import {
    NewObjectForm,
    ObjectReturnForm,
} from 'ui/components/inputs/UserForm/UserForm';
import { FormContainerStyled } from 'ui/components/inputs/UserForm/UserForm.style';
import { FormProvider } from 'react-hook-form';

// import { Component } from '@styles/pages/gerenciamento-objetos.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Gerenciamento de Objetos',
        },
    };
};

const GerenciamentoObjetos: React.FC = () => {
    const {
        filteredLostObjectsList,
        selectedObject,
        currentAction,
        selectObject,
        onDialogClose,
        onEdit,
        onErase,
        onReturn,
        returnForm,
        editForm,
        snackbarMessage,
        setSnackbarMessage,
        hasActions,
    } = useGerenciamentoObjetos();
    return (
        <Container>
            <PageTitle
                title={'Lista de Objetos Disponíveis'}
                subtitle={'Lista de objetos não entregues aos donos'}
            />

            {filteredLostObjectsList.length === 0 ? (
                <Typography variant={'h6'} align={'center'}>
                    Nenhum objeto encontrado ainda
                </Typography>
            ) : (
                <Table
                    header={['Nome', 'Descrição', 'Ações']}
                    data={filteredLostObjectsList}
                    rowElement={(item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.nome}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell>
                                {hasActions(item) && (
                                    <>
                                        <Button
                                            onClick={() =>
                                                selectObject(item, 'EDIT')
                                            }
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                selectObject(item, 'ERASE')
                                            }
                                        >
                                            Apagar
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                selectObject(item, 'RETURN')
                                            }
                                        >
                                            Informar Entrega
                                        </Button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                />
            )}

            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Link
                    href={'/cadastro-objeto'}
                    mui={{ variant: 'contained' }}
                    Component={Button}
                >
                    Adicionar Objeto
                </Link>
            </Box>

            <Dialog
                isOpen={selectedObject.id !== 0 && currentAction === 'EDIT'}
                title={'Editar Objeto'}
                subtitle={'Atualize os dados do objeto'}
                confirmLabel={'Salvar'}
                onConfirm={editForm.handleSubmit(onEdit)}
                onClose={onDialogClose}
            >
                <FormProvider {...editForm}>
                    <FormContainerStyled>
                        <NewObjectForm />
                    </FormContainerStyled>
                </FormProvider>
            </Dialog>

            <Dialog
                isOpen={selectedObject.id !== 0 && currentAction === 'ERASE'}
                title={'Apagar Objeto'}
                subtitle={'Tem certeza que deseja apagar esse objeto?'}
                onConfirm={onErase}
                onClose={onDialogClose}
            >
                {selectedObject?.nome} - {selectedObject?.descricao}
            </Dialog>

            <Dialog
                isOpen={selectedObject.id !== 0 && currentAction === 'RETURN'}
                title={'Informar Entrega'}
                subtitle={
                    'Entre com os dados da pessoa para qual o objeto foi entregue '
                }
                confirmLabel={'Confirmar entrega'}
                onConfirm={returnForm.handleSubmit(onReturn)}
                onClose={onDialogClose}
            >
                <FormProvider {...returnForm}>
                    <FormContainerStyled>
                        <ObjectReturnForm />
                    </FormContainerStyled>
                </FormProvider>
            </Dialog>

            <Snackbar
                open={snackbarMessage.length > 0}
                autoHideDuration={4000}
                message={snackbarMessage}
                onClose={() => setSnackbarMessage('')}
            />
        </Container>
    );
};

export default GerenciamentoObjetos;
