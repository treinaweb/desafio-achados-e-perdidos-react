import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import { LocationListItemInterface } from 'data/@types/LocationListItemInterface';
import { ApiService, ApiServiceHateoas } from 'data/services/ApiService';

export default function useListaObjetos() {
    const router = useRouter(),
        { name: locationName, id } = router.query,
        { externalServicesState } = useContext(ExternalServicesContext),
        [objectsList, setLocationList] = useState<LocationListItemInterface[]>(
            [] as LocationListItemInterface[]
        );

    useEffect(() => {
        (async () => {
            if (id) {
                const response = await ApiService.get(
                    `/api/locais/${id}/objetos`
                );
                setLocationList(response.data);
            }
        })();
    }, [externalServicesState.externalServices, id]);

    return {
        objectsList,
        locationName,
    };
}
