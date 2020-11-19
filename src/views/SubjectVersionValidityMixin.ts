import { SubjectVersionValidity } from '@/logic/Resources'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SubjectVersionValidityMixin extends Vue {

  subjectVersionValidityIcon(subjectValidity: SubjectVersionValidity) {
      switch(subjectValidity) {
        case  SubjectVersionValidity.Pending:
          return "mdi-circle-edit-outline"
        case  SubjectVersionValidity.ValidActive:
          return "mdi-check-decagram"
        case  SubjectVersionValidity.ValidFrozen:
          return "mdi-play-circle-outline"
        case SubjectVersionValidity.Invalid:
          return "mdi-cancel"
        case  SubjectVersionValidity.Unspecified:
          return "mdi-help-circle-outline"
        default:
          return "mdi-help-circle-outline"
      }
  }

  subjectVersionValidityColor(subjectValidity: SubjectVersionValidity) {

    switch(subjectValidity) {
      case  SubjectVersionValidity.Pending:
        return "orange"
      case  SubjectVersionValidity.ValidActive:
        return "primary"
      case  SubjectVersionValidity.ValidFrozen:
        return "primary"
      case SubjectVersionValidity.Invalid:
        return "blue-grey darken-3"
      case  SubjectVersionValidity.Unspecified:
        return "blue-grey darken-3"
      default:
        return ""
    }
  }


  subjectVersionValidityTextColor(subjectValidity: SubjectVersionValidity) {

    switch(subjectValidity) {
      case  SubjectVersionValidity.Pending:
        return "orange"
      case  SubjectVersionValidity.ValidActive:
        return "primary"
      case  SubjectVersionValidity.ValidFrozen:
        return "primary"
      case SubjectVersionValidity.Invalid:
        return "blue-grey darken-3"
      case  SubjectVersionValidity.Unspecified:
        return "blue-grey darken-3"
      default:
        return ""
    }
  }

}
