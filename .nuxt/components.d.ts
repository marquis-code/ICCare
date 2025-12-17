
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AppFooter': typeof import("../components/AppFooter.vue")['default']
    'AppHeader': typeof import("../components/AppHeader.vue")['default']
    'Appointment': typeof import("../components/Appointment.vue")['default']
    'AppointmentCard': typeof import("../components/AppointmentCard.vue")['default']
    'BiospecimenBatchImportModal': typeof import("../components/Biospecimen/BatchImportModal.vue")['default']
    'BiospecimenConfirmActionModal': typeof import("../components/Biospecimen/ConfirmActionModal.vue")['default']
    'BiospecimenDetailsModal': typeof import("../components/Biospecimen/DetailsModal.vue")['default']
    'BiospecimenNewSpecimenModal': typeof import("../components/Biospecimen/NewSpecimenModal.vue")['default']
    'BiospecimenTransferModal': typeof import("../components/Biospecimen/TransferModal.vue")['default']
    'ConsultationTypeCard': typeof import("../components/ConsultationTypeCard.vue")['default']
    'DateRangePicker': typeof import("../components/DateRangePicker.vue")['default']
    'DetailModal': typeof import("../components/DetailModal.vue")['default']
    'EmptyState': typeof import("../components/EmptyState.vue")['default']
    'LoadingSpinner': typeof import("../components/LoadingSpinner.vue")['default']
    'MultiSelect': typeof import("../components/MultiSelect.vue")['default']
    'NotificationDetail': typeof import("../components/NotificationDetail.vue")['default']
    'NotificationList': typeof import("../components/NotificationList.vue")['default']
    'PersonalInfoTab': typeof import("../components/PersonalInfoTab.vue")['default']
    'SecurityTab': typeof import("../components/SecurityTab.vue")['default']
    'SettingsTab': typeof import("../components/SettingsTab.vue")['default']
    'TimeSlotPicker': typeof import("../components/TimeSlotPicker.vue")['default']
    'CoreAlertModal': typeof import("../components/core/AlertModal.vue")['default']
    'CoreCustomCalendar': typeof import("../components/core/CustomCalendar.vue")['default']
    'CoreDateInput': typeof import("../components/core/DateInput.vue")['default']
    'CoreDateRangePicker': typeof import("../components/core/DateRangePicker.vue")['default']
    'CoreLoadingSpinner': typeof import("../components/core/LoadingSpinner.vue")['default']
    'CoreModal': typeof import("../components/core/Modal.vue")['default']
    'CoreRadioInput': typeof import("../components/core/RadioInput.vue")['default']
    'CoreToast': typeof import("../components/core/Toast.vue")['default']
    'UiAnimatedInput': typeof import("../components/ui/AnimatedInput.vue")['default']
    'UiCustomDropdown': typeof import("../components/ui/CustomDropdown.vue")['default']
    'UiCustomToggle': typeof import("../components/ui/CustomToggle.vue")['default']
    'UiPhoneInput': typeof import("../components/ui/PhoneInput.vue")['default']
    'UiPhoneNumberInput': typeof import("../components/ui/PhoneNumberInput.vue")['default']
    'UiSelectInput': typeof import("../components/ui/SelectInput.vue")['default']
    'UiToast': typeof import("../components/ui/Toast.vue")['default']
    'UiVerifyEmailOtpInput': typeof import("../components/ui/VerifyEmailOtpInput.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAppFooter': LazyComponent<typeof import("../components/AppFooter.vue")['default']>
    'LazyAppHeader': LazyComponent<typeof import("../components/AppHeader.vue")['default']>
    'LazyAppointment': LazyComponent<typeof import("../components/Appointment.vue")['default']>
    'LazyAppointmentCard': LazyComponent<typeof import("../components/AppointmentCard.vue")['default']>
    'LazyBiospecimenBatchImportModal': LazyComponent<typeof import("../components/Biospecimen/BatchImportModal.vue")['default']>
    'LazyBiospecimenConfirmActionModal': LazyComponent<typeof import("../components/Biospecimen/ConfirmActionModal.vue")['default']>
    'LazyBiospecimenDetailsModal': LazyComponent<typeof import("../components/Biospecimen/DetailsModal.vue")['default']>
    'LazyBiospecimenNewSpecimenModal': LazyComponent<typeof import("../components/Biospecimen/NewSpecimenModal.vue")['default']>
    'LazyBiospecimenTransferModal': LazyComponent<typeof import("../components/Biospecimen/TransferModal.vue")['default']>
    'LazyConsultationTypeCard': LazyComponent<typeof import("../components/ConsultationTypeCard.vue")['default']>
    'LazyDateRangePicker': LazyComponent<typeof import("../components/DateRangePicker.vue")['default']>
    'LazyDetailModal': LazyComponent<typeof import("../components/DetailModal.vue")['default']>
    'LazyEmptyState': LazyComponent<typeof import("../components/EmptyState.vue")['default']>
    'LazyLoadingSpinner': LazyComponent<typeof import("../components/LoadingSpinner.vue")['default']>
    'LazyMultiSelect': LazyComponent<typeof import("../components/MultiSelect.vue")['default']>
    'LazyNotificationDetail': LazyComponent<typeof import("../components/NotificationDetail.vue")['default']>
    'LazyNotificationList': LazyComponent<typeof import("../components/NotificationList.vue")['default']>
    'LazyPersonalInfoTab': LazyComponent<typeof import("../components/PersonalInfoTab.vue")['default']>
    'LazySecurityTab': LazyComponent<typeof import("../components/SecurityTab.vue")['default']>
    'LazySettingsTab': LazyComponent<typeof import("../components/SettingsTab.vue")['default']>
    'LazyTimeSlotPicker': LazyComponent<typeof import("../components/TimeSlotPicker.vue")['default']>
    'LazyCoreAlertModal': LazyComponent<typeof import("../components/core/AlertModal.vue")['default']>
    'LazyCoreCustomCalendar': LazyComponent<typeof import("../components/core/CustomCalendar.vue")['default']>
    'LazyCoreDateInput': LazyComponent<typeof import("../components/core/DateInput.vue")['default']>
    'LazyCoreDateRangePicker': LazyComponent<typeof import("../components/core/DateRangePicker.vue")['default']>
    'LazyCoreLoadingSpinner': LazyComponent<typeof import("../components/core/LoadingSpinner.vue")['default']>
    'LazyCoreModal': LazyComponent<typeof import("../components/core/Modal.vue")['default']>
    'LazyCoreRadioInput': LazyComponent<typeof import("../components/core/RadioInput.vue")['default']>
    'LazyCoreToast': LazyComponent<typeof import("../components/core/Toast.vue")['default']>
    'LazyUiAnimatedInput': LazyComponent<typeof import("../components/ui/AnimatedInput.vue")['default']>
    'LazyUiCustomDropdown': LazyComponent<typeof import("../components/ui/CustomDropdown.vue")['default']>
    'LazyUiCustomToggle': LazyComponent<typeof import("../components/ui/CustomToggle.vue")['default']>
    'LazyUiPhoneInput': LazyComponent<typeof import("../components/ui/PhoneInput.vue")['default']>
    'LazyUiPhoneNumberInput': LazyComponent<typeof import("../components/ui/PhoneNumberInput.vue")['default']>
    'LazyUiSelectInput': LazyComponent<typeof import("../components/ui/SelectInput.vue")['default']>
    'LazyUiToast': LazyComponent<typeof import("../components/ui/Toast.vue")['default']>
    'LazyUiVerifyEmailOtpInput': LazyComponent<typeof import("../components/ui/VerifyEmailOtpInput.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AppFooter: typeof import("../components/AppFooter.vue")['default']
export const AppHeader: typeof import("../components/AppHeader.vue")['default']
export const Appointment: typeof import("../components/Appointment.vue")['default']
export const AppointmentCard: typeof import("../components/AppointmentCard.vue")['default']
export const BiospecimenBatchImportModal: typeof import("../components/Biospecimen/BatchImportModal.vue")['default']
export const BiospecimenConfirmActionModal: typeof import("../components/Biospecimen/ConfirmActionModal.vue")['default']
export const BiospecimenDetailsModal: typeof import("../components/Biospecimen/DetailsModal.vue")['default']
export const BiospecimenNewSpecimenModal: typeof import("../components/Biospecimen/NewSpecimenModal.vue")['default']
export const BiospecimenTransferModal: typeof import("../components/Biospecimen/TransferModal.vue")['default']
export const ConsultationTypeCard: typeof import("../components/ConsultationTypeCard.vue")['default']
export const DateRangePicker: typeof import("../components/DateRangePicker.vue")['default']
export const DetailModal: typeof import("../components/DetailModal.vue")['default']
export const EmptyState: typeof import("../components/EmptyState.vue")['default']
export const LoadingSpinner: typeof import("../components/LoadingSpinner.vue")['default']
export const MultiSelect: typeof import("../components/MultiSelect.vue")['default']
export const NotificationDetail: typeof import("../components/NotificationDetail.vue")['default']
export const NotificationList: typeof import("../components/NotificationList.vue")['default']
export const PersonalInfoTab: typeof import("../components/PersonalInfoTab.vue")['default']
export const SecurityTab: typeof import("../components/SecurityTab.vue")['default']
export const SettingsTab: typeof import("../components/SettingsTab.vue")['default']
export const TimeSlotPicker: typeof import("../components/TimeSlotPicker.vue")['default']
export const CoreAlertModal: typeof import("../components/core/AlertModal.vue")['default']
export const CoreCustomCalendar: typeof import("../components/core/CustomCalendar.vue")['default']
export const CoreDateInput: typeof import("../components/core/DateInput.vue")['default']
export const CoreDateRangePicker: typeof import("../components/core/DateRangePicker.vue")['default']
export const CoreLoadingSpinner: typeof import("../components/core/LoadingSpinner.vue")['default']
export const CoreModal: typeof import("../components/core/Modal.vue")['default']
export const CoreRadioInput: typeof import("../components/core/RadioInput.vue")['default']
export const CoreToast: typeof import("../components/core/Toast.vue")['default']
export const UiAnimatedInput: typeof import("../components/ui/AnimatedInput.vue")['default']
export const UiCustomDropdown: typeof import("../components/ui/CustomDropdown.vue")['default']
export const UiCustomToggle: typeof import("../components/ui/CustomToggle.vue")['default']
export const UiPhoneInput: typeof import("../components/ui/PhoneInput.vue")['default']
export const UiPhoneNumberInput: typeof import("../components/ui/PhoneNumberInput.vue")['default']
export const UiSelectInput: typeof import("../components/ui/SelectInput.vue")['default']
export const UiToast: typeof import("../components/ui/Toast.vue")['default']
export const UiVerifyEmailOtpInput: typeof import("../components/ui/VerifyEmailOtpInput.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAppFooter: LazyComponent<typeof import("../components/AppFooter.vue")['default']>
export const LazyAppHeader: LazyComponent<typeof import("../components/AppHeader.vue")['default']>
export const LazyAppointment: LazyComponent<typeof import("../components/Appointment.vue")['default']>
export const LazyAppointmentCard: LazyComponent<typeof import("../components/AppointmentCard.vue")['default']>
export const LazyBiospecimenBatchImportModal: LazyComponent<typeof import("../components/Biospecimen/BatchImportModal.vue")['default']>
export const LazyBiospecimenConfirmActionModal: LazyComponent<typeof import("../components/Biospecimen/ConfirmActionModal.vue")['default']>
export const LazyBiospecimenDetailsModal: LazyComponent<typeof import("../components/Biospecimen/DetailsModal.vue")['default']>
export const LazyBiospecimenNewSpecimenModal: LazyComponent<typeof import("../components/Biospecimen/NewSpecimenModal.vue")['default']>
export const LazyBiospecimenTransferModal: LazyComponent<typeof import("../components/Biospecimen/TransferModal.vue")['default']>
export const LazyConsultationTypeCard: LazyComponent<typeof import("../components/ConsultationTypeCard.vue")['default']>
export const LazyDateRangePicker: LazyComponent<typeof import("../components/DateRangePicker.vue")['default']>
export const LazyDetailModal: LazyComponent<typeof import("../components/DetailModal.vue")['default']>
export const LazyEmptyState: LazyComponent<typeof import("../components/EmptyState.vue")['default']>
export const LazyLoadingSpinner: LazyComponent<typeof import("../components/LoadingSpinner.vue")['default']>
export const LazyMultiSelect: LazyComponent<typeof import("../components/MultiSelect.vue")['default']>
export const LazyNotificationDetail: LazyComponent<typeof import("../components/NotificationDetail.vue")['default']>
export const LazyNotificationList: LazyComponent<typeof import("../components/NotificationList.vue")['default']>
export const LazyPersonalInfoTab: LazyComponent<typeof import("../components/PersonalInfoTab.vue")['default']>
export const LazySecurityTab: LazyComponent<typeof import("../components/SecurityTab.vue")['default']>
export const LazySettingsTab: LazyComponent<typeof import("../components/SettingsTab.vue")['default']>
export const LazyTimeSlotPicker: LazyComponent<typeof import("../components/TimeSlotPicker.vue")['default']>
export const LazyCoreAlertModal: LazyComponent<typeof import("../components/core/AlertModal.vue")['default']>
export const LazyCoreCustomCalendar: LazyComponent<typeof import("../components/core/CustomCalendar.vue")['default']>
export const LazyCoreDateInput: LazyComponent<typeof import("../components/core/DateInput.vue")['default']>
export const LazyCoreDateRangePicker: LazyComponent<typeof import("../components/core/DateRangePicker.vue")['default']>
export const LazyCoreLoadingSpinner: LazyComponent<typeof import("../components/core/LoadingSpinner.vue")['default']>
export const LazyCoreModal: LazyComponent<typeof import("../components/core/Modal.vue")['default']>
export const LazyCoreRadioInput: LazyComponent<typeof import("../components/core/RadioInput.vue")['default']>
export const LazyCoreToast: LazyComponent<typeof import("../components/core/Toast.vue")['default']>
export const LazyUiAnimatedInput: LazyComponent<typeof import("../components/ui/AnimatedInput.vue")['default']>
export const LazyUiCustomDropdown: LazyComponent<typeof import("../components/ui/CustomDropdown.vue")['default']>
export const LazyUiCustomToggle: LazyComponent<typeof import("../components/ui/CustomToggle.vue")['default']>
export const LazyUiPhoneInput: LazyComponent<typeof import("../components/ui/PhoneInput.vue")['default']>
export const LazyUiPhoneNumberInput: LazyComponent<typeof import("../components/ui/PhoneNumberInput.vue")['default']>
export const LazyUiSelectInput: LazyComponent<typeof import("../components/ui/SelectInput.vue")['default']>
export const LazyUiToast: LazyComponent<typeof import("../components/ui/Toast.vue")['default']>
export const LazyUiVerifyEmailOtpInput: LazyComponent<typeof import("../components/ui/VerifyEmailOtpInput.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
