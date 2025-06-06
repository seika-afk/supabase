import { ApiKeysMoved } from 'components/interfaces/Settings/API/ApiKeysMoved'
import ServiceList from 'components/interfaces/Settings/API/ServiceList'
import DefaultLayout from 'components/layouts/DefaultLayout'
import SettingsLayout from 'components/layouts/ProjectSettingsLayout/SettingsLayout'
import { ScaffoldContainer, ScaffoldHeader, ScaffoldTitle } from 'components/layouts/Scaffold'
import type { NextPageWithLayout } from 'types'

const ApiSettings: NextPageWithLayout = () => {
  return (
    <>
      <ScaffoldContainer id="billing-page-top">
        <ScaffoldHeader>
          <ScaffoldTitle>API Settings</ScaffoldTitle>
        </ScaffoldHeader>
      </ScaffoldContainer>
      <ScaffoldContainer bottomPadding>
        <ServiceList />
      </ScaffoldContainer>
    </>
  )
}

ApiSettings.getLayout = (page) => (
  <DefaultLayout>
    <SettingsLayout title="API Settings">{page}</SettingsLayout>
  </DefaultLayout>
)
export default ApiSettings
