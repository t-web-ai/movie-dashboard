import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { ProfileRecord } from "./profile-data";

interface ProfileHeaderProps {
  profile: ProfileRecord;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-5 px-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="grid size-18 shrink-0 place-items-center sm:size-23">
          <Avatar className="col-start-1 row-start-1 size-16 shadow after:border-0 sm:size-20">
            <AvatarImage alt={profile.name} src={profile.avatar} />
            <AvatarFallback>{profile.initials}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <h1 className="truncate font-heading font-semibold text-xl leading-6 tracking-tight sm:text-2xl sm:leading-7">
              {profile.name}
            </h1>
            <p className="truncate text-muted-foreground text-sm leading-5">
              {profile.workEmail} · {profile.jobTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
