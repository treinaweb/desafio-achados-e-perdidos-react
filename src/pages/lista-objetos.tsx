import React from 'react';
import { GetStaticProps } from 'next';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import { Container, Typography } from '@mui/material';
import ListItem, {
    ItemsList,
} from 'ui/components/data-display/ListItem/ListItem';
import useListaObjetos from 'data/hooks/pages/useListaObjetos.page';

// import { Component } from '@styles/pages/lista-objetos.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Lista Objetos',
        },
    };
};

const ListaObjetos: React.FC = () => {
    const { objectsList, locationName } = useListaObjetos();
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
                            name={'Nome do objeto'}
                            description={
                                <>
                                    Descrição do objeto <br />
                                    Encontrado em: 00/00/0000
                                </>
                            }
                            picture={obj.imagem || ''}
                            actionLabel={'Entrar em contato'}
                            onClick={() => {}}
                        />
                    ))}
                </ItemsList>
            ) : (
                <Typography sx={{ textAlign: 'center' }}>
                    Nenhum objeto encontrado aqui
                </Typography>
            )}
        </Container>
    );
};

export default ListaObjetos;
