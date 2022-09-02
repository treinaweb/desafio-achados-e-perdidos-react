import React from 'react';
import { GetStaticProps } from 'next';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import { Container, Typography } from '@mui/material';
import ListItem, {
    ItemsList,
} from 'ui/components/data-display/ListItem/ListItem';
import useListaObjetos from 'data/hooks/pages/useListaObjetos.page';
import { TextFormatService } from 'data/services/TextFormatService';
import Dialog from 'ui/components/feedback/Dialog/Dialog';

// import { Component } from '@styles/pages/lista-objetos.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Lista Objetos',
        },
    };
};

const ListaObjetos: React.FC = () => {
    const {
        objectsList,
        locationName,
        dataObj,
        selectContactModal,
        openModal,
    } = useListaObjetos();
    return (
        <Container maxWidth={'md'}>
            <PageTitle
                title={'Objetos perdidos em ' + locationName}
                subtitle={
                    'Verifique na lista abaixo se o objeto que perdeu está disponível neste local'
                }
            />

            {objectsList.length > 0 ? (
                <ItemsList>
                    {objectsList.map((obj, index) => (
                        <ListItem
                            key={index}
                            name={obj.nome}
                            description={
                                <>
                                    {obj.descricao} <br />
                                    Encontrado em:{' '}
                                    {TextFormatService.reverseDate(
                                        obj.data_cadastro
                                    )}
                                </>
                            }
                            picture={obj.imagem || ''}
                            actionLabel={'Entrar em contato'}
                            onClick={() => selectContactModal(obj)}
                        />
                    ))}
                </ItemsList>
            ) : (
                <Typography sx={{ textAlign: 'center' }}>
                    Nenhum objeto encontrado aqui
                </Typography>
            )}

            <Dialog
                isOpen={openModal}
                onClose={() => selectContactModal()}
                title={'Contato'}
                noCancel
                noConfirm
            >
                {TextFormatService.formatPhoneNumberWithTypeNumber(
                    dataObj?.contato!
                )}
            </Dialog>
        </Container>
    );
};

export default ListaObjetos;
