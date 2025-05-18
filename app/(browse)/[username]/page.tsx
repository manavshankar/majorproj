import React from "react";
import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface PageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: params.username,
  };
}

export default async function UserPage({ params }: PageProps) {
  const { username } = params;

  const user = await getUserByUsername(username);
  if (!user || !user.stream) notFound();

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) notFound();

  return (
    <StreamPlayer
      user={user}
      isFollowing={isFollowing}
      stream={user.stream}
    />
  );
}
