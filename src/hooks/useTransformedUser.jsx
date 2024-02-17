import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { getQualities, getQualitiesLoadingStatus } from '../store/qualities'
import { getProfessions, getProfessionsLoadingStatus } from '../store/professions'

const useTransformedUser = (originalUser) => {
    const [user, setUser] = useState(_.omit(originalUser, ['qualities', 'profession']))
    const professions = useSelector(getProfessions())
    const isProfessionsLoading = useSelector(getProfessionsLoadingStatus())
    const qualities = useSelector(getQualities())
    const isQualitiesLoading = useSelector(getQualitiesLoadingStatus())
    useEffect(() => {
        if (!isQualitiesLoading) {
            setUser((prevState) => {
                const transformedQualities = qualities.filter((current) => originalUser.qualities?.includes(current._id))

                return { ...prevState, qualities: transformedQualities }
            })
        }
    }, [isQualitiesLoading])
    useEffect(() => {
        if (!isProfessionsLoading) {
            setUser((prevState) => {
                const transformedProfession = professions.find((current) => current._id === originalUser.profession)

                return { ...prevState, profession: transformedProfession }
            })
        }
    }, [isProfessionsLoading])

    return [user, setUser]
}

export default useTransformedUser
