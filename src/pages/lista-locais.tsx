import React from 'react';
import { GetStaticProps } from 'next';
import { Container, Typography } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import ListItem, {
    ItemsList,
} from 'ui/components/data-display/ListItem/ListItem';
import useListaLocais from 'data/hooks/pages/useListaLocais.page';

// import { Component } from '@styles/pages/lista-locais.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Lista Locais',
        },
    };
};

const ListaLocais: React.FC = () => {
    const { locationsList, search } = useListaLocais();
    return (
        <Container maxWidth={'md'}>
            <PageTitle
                title={'Locais encontrados'}
                subtitle={
                    'Selecione um local para ver os objetos que estão disponíveis no setor de achados e perdidos'
                }
            />

            {locationsList.length > 0 ? (
                <ItemsList>
                    {locationsList.map((location) => (
                        <ListItem
                            key={location.id}
                            name={location.nome}
                            description={location.endereco}
                            picture={location.imagem || ''}
                            actionLabel={'Ver objetos'}
                            href={`/lista-objetos?name=${location.nome}&id=${location.id}`}
                        />
                    ))}
                </ItemsList>
            ) : (
                <Typography sx={{ textAlign: 'center' }}>
                    Nenhum local encontrado para: {search}
                </Typography>
            )}
        </Container>
    );
};

export default ListaLocais;
