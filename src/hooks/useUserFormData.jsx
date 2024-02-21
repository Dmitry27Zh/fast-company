import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { getQualities, getQualitiesLoadingStatus } from '../store/qualities'

const useUserFormData = (originalUser) => {
    const [user, setUser] = useState(_.omit(originalUser, ['qualities']))
    const qualities = useSelector(getQualities())
    const isQualitiesLoading = useSelector(getQualitiesLoadingStatus())
    useEffect(() => {
        if (!isQualitiesLoading) {
            setUser((prevState) => {
                const transformedQualities = qualities
                    .filter((current) => originalUser.qualities?.includes(current._id))
                    .map((quality) => ({
                        value: quality._id,
                        label: quality.name
                    }))

                return { ...prevState, qualities: transformedQualities }
            })
        }
    }, [isQualitiesLoading])

    return [user, setUser]
}

export default useUserFormData
