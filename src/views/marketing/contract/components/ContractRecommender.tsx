import React from 'react'
import { RecommenderModel } from '../../../../models/marketing/MrkModels'

const ContractRecommender = ({ recommender }: { recommender: RecommenderModel | undefined }) => {
  if (!recommender) {
    return null
  }

  let state = 'Неизвестно'
  switch (recommender.state) {
    case 'APPROVED':
      state = 'Подтвержден'
      break
    case 'REJECTED':
      state = 'Отклонено'
      break
  }


  return <p>
    {recommender.displayName} {`(${state})`}
  </p>
}

export default ContractRecommender
