import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import { LocationListItemInterface } from 'data/@types/LocationListItemInterface';
import { ApiServiceHateoas } from 'data/services/ApiService';

export default function useListaLocais() {
    const router = useRouter(),
        { q: search } = router.query,
        { externalServicesState } = useContext(ExternalServicesContext),
        [locationsList, setLocationList] = useState<
            LocationListItemInterface[]
        >([] as LocationListItemInterface[]);

    useEffect(() => {
        if (search) {
            ApiServiceHateoas(
                externalServicesState.externalServices,
                'buscar_locais',
                async (request) => {
                    const response = await request<LocationListItemInterface[]>(
                        {
                            params: { nome: search },
                        }
                    );
                    setLocationList(response.data);
                }
            );
        }
    }, [externalServicesState.externalServices, search]);

    return {
        locationsList,
        search,
    };
}
