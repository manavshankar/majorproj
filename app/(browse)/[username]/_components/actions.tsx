"use client";

import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { onBlock,onUnblock } from "@/actions/block";
import {toast} from "sonner"

export function Actions({
    isFollowing,
    userId,
  }: {
    isFollowing: boolean;
    userId: string;
}){
    const handleFollow = () => {
        startTransition(() => {
          onFollow(userId)
            .then((data) =>
              toast.success(`You are now following ${data.following.username}`)
            )
            .catch(() => toast.error("Something went wrong, failed to follow"));
        });
    };
    
    const handleUnfollow = () => {
    startTransition(() => {
        onUnfollow(userId)
        .then((data) =>
            toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong, failed to follow"));
    });
    };
    const handleBlock = () => {
        startTransition(() => {
          onBlock(userId)
            .then((data) =>
              !!data
                ? toast.success(`You have blocked ${data?.blocked.username}`)
                : toast.success("Blocked guest")
            )
            .catch(() => toast.error("Something went wrong, failed to block"));
        });
    };
    
    const handleUnblock = () => {
    startTransition(() => {
        onUnblock(userId)
        .then((data) =>
            toast.success(`You have unblocked ${data.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong, failed to unblock"));
    });
    };
    
    const onClick = () => {
        if (isFollowing) {
          handleUnfollow();
        } else {
          handleFollow();
        }
      };
    const [isPending, startTransition] = useTransition();
    return(
        <>
            <Button variant="primary" disabled={isPending} onClick={onClick}>
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button onClick={handleBlock} disabled={isPending}>
                Block
            </Button>
            <Button onClick={handleUnblock} disabled={isPending}>
                UnBlock
            </Button>
        </>
    )
}