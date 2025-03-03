import { BasicInfoEditForm } from "@/components/custom/basic-info-edit-form"
import { PlatformEditForm } from "@/components/custom/platform-edit-form"
import { SocialsEditForm } from "@/components/custom/socials-edit-form"
import { VisibilityEditForm } from "@/components/custom/visibility-edit-form"
import { AccountsEditForm } from "@/components/custom/accounts-edit-form"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const editSections = [
  {
    title: "Basic Info",
    route: "basic_info",
  },
  {
    title: "Socials",
    route: "socials",
  },
  {
    title: "Platform",
    route: "platform",
  },
  {
    title: "Visibility",
    route: "visibility",
  },
  {
    title: "Accounts",
    route: "accounts",
  },
]

const renderActiveSection = (activeSectionRoute: string) => {

  switch (activeSectionRoute){
    case "basic_info":
      return <BasicInfoEditForm />

    case "socials":
      return <SocialsEditForm />
      
    case "platform":
      return <PlatformEditForm />

    case "visibility":
      return <VisibilityEditForm />

    case "accounts":
      return <AccountsEditForm />

    default:
      return null;
  }
}

export const EditUserProfile = () => {

  const [activeSectionRoute, setActiveSectionRoute] = useState<string>(editSections[0].route);

  return (
    <div className="w-full p-10 flex gap-5 justify-start items-start">

      <div className="w-[25%] flex flex-col gap-3">
        {
          editSections.map((section) => {
            return <Button variant="link" className={`flex justify-start items-start ${activeSectionRoute === section.route ? "bg-accent text-accent-foreground" : ""}`} onClick={() => {
              setActiveSectionRoute(section.route);
            }}>
              {section.title}
            </Button>
          })
        }
      </div>

      {
        renderActiveSection(activeSectionRoute)
      }


    </div>
  )
}
