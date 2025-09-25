"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { X, Heart, Bookmark, ArrowDown } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { UserProfile } from "@/types";

export default function MatchingPage() {
  const [acceptedUsers, setAcceptedUsers] = useState<UserProfile[]>([]);
  const [rejectedUsers, setRejectedUsers] = useState<string[]>([]);
  const [shortlistedUsers, setShortlistedUsers] = useState<string[]>([]);
  const [userQueue, setUserQueue] = useState<UserProfile[]>([]);
  const [cardPosition, setCardPosition] = useState({
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
  });
  const [dragDirection, setDragDirection] = useState<
    "left" | "right" | "down" | null
  >(null);

  // Initialize the queue with users who applied to current user (simulated)
  useEffect(() => {
    if (
      userQueue.length === 0 &&
      rejectedUsers.length === 0 &&
      acceptedUsers.length === 0
    ) {
      setUserQueue(mockUsers.slice(0, 15));
    }
  }, []); // Only run once on mount

  const currentUser = userQueue[0]; // Front of the queue

  const handleSwipe = (direction: "left" | "right" | "down") => {
    if (!currentUser) return;

    if (direction === "left") {
      // Reject: remove from front of queue, add to rejected list
      setRejectedUsers((prev) => [...prev, currentUser.id]);
      setUserQueue((prev) => prev.slice(1)); // Remove first item
    } else if (direction === "right") {
      // Accept: remove from front of queue, add to accepted list
      setAcceptedUsers((prev) => [...prev, currentUser]);
      setUserQueue((prev) => prev.slice(1)); // Remove first item
    } else if (direction === "down") {
      // Shortlist: remove from front, mark as shortlisted, add to back
      setShortlistedUsers((prev) => [...prev, currentUser.id]);
      setUserQueue((prev) => [...prev.slice(1), currentUser]); // Remove first, add to back
    }

    // Reset card position and drag direction
    setCardPosition({ x: 0, y: 0, rotation: 0, scale: 1 });
    setDragDirection(null);
  };

  // No need for nextCard function - queue management handles this automatically

  const bind = useDrag(
    ({ down, movement: [mx, my], direction: [xDir, yDir], velocity: [vx] }) => {
      if (!currentUser) return;

      const trigger = Math.abs(mx) > 100 || Math.abs(my) > 100;
      const isGone = !down && trigger;

      if (isGone) {
        // Determine direction based on movement
        let dir: "left" | "right" | "down";
        if (Math.abs(my) > Math.abs(mx) && my > 0) {
          dir = "down";
        } else {
          dir = xDir < 0 ? "left" : "right";
        }
        handleSwipe(dir);
        setDragDirection(null);
      } else {
        const rotation = mx * 0.1;
        const scale = down ? 1.05 : 1;

        // Set drag direction for visual feedback
        if (down) {
          if (Math.abs(my) > Math.abs(mx) && my > 50) {
            setDragDirection("down");
          } else if (mx < -50) {
            setDragDirection("left");
          } else if (mx > 50) {
            setDragDirection("right");
          } else {
            setDragDirection(null);
          }
        } else {
          setDragDirection(null);
        }

        setCardPosition({
          x: down ? mx : 0,
          y: down ? my : 0,
          rotation,
          scale,
        });
      }
    }
  );

  const isShortlisted =
    currentUser && shortlistedUsers.includes(currentUser.id);
  const isFinished = userQueue.length === 0; // Queue is empty

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="mb-6">
            <Heart className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">All Done!</h1>
            <p className="text-gray-600">
              You've reviewed all potential matches
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h2 className="font-semibold text-green-800 mb-2">
                Accepted Matches
              </h2>
              <p className="text-2xl font-bold text-green-600">
                {acceptedUsers.length}
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h2 className="font-semibold text-red-800 mb-2">Rejected</h2>
              <p className="text-2xl font-bold text-red-600">
                {rejectedUsers.length}
              </p>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/results")}
            className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Matching</h1>
            <div className="text-sm text-gray-500">
              {rejectedUsers.length + acceptedUsers.length} of{" "}
              {mockUsers.slice(0, 15).length} decided
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((rejectedUsers.length + acceptedUsers.length) /
                  mockUsers.slice(0, 15).length) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Card Stack */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="relative h-[600px]">
          <AnimatePresence>
            {currentUser && (
              <motion.div
                key={currentUser.id}
                className="absolute inset-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{
                  x: 300,
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  {...bind()}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                  style={{
                    transform: `translate(${cardPosition.x}px, ${cardPosition.y}px) rotate(${cardPosition.rotation}deg) scale(${cardPosition.scale})`,
                  }}
                >
                  <SwipeCard
                    user={currentUser}
                    isShortlisted={isShortlisted}
                    dragDirection={dragDirection}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8 mt-8">
          <button
            onClick={() => handleSwipe("left")}
            className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={() => handleSwipe("down")}
            className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
          >
            <Bookmark className="h-6 w-6" />
          </button>

          <button
            onClick={() => handleSwipe("right")}
            className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg"
          >
            <Heart className="h-6 w-6" />
          </button>
        </div>

        {/* Swipe Hints */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Swipe left to reject • Swipe down to shortlist • Swipe right to
            accept
          </p>
        </div>
      </div>
    </div>
  );
}

interface SwipeCardProps {
  user: UserProfile;
  isShortlisted: boolean;
  dragDirection: "left" | "right" | "down" | null;
}

function SwipeCard({ user, isShortlisted, dragDirection }: SwipeCardProps) {
  // Determine background color based on drag direction
  const getBackgroundColor = () => {
    if (dragDirection === "left") return "bg-red-50 border-red-200";
    if (dragDirection === "right") return "bg-green-50 border-green-200";
    if (dragDirection === "down") return "bg-blue-50 border-blue-200";
    if (isShortlisted) return "bg-blue-50 border-2 border-blue-200";
    return "bg-white";
  };

  return (
    <div
      className={`w-full h-full rounded-2xl shadow-xl overflow-hidden border-2 transition-colors ${getBackgroundColor()}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold">{user.publicTitle}</h2>
        <p className="text-purple-100 mt-1">
          {user.universityYear}
          {user.term} • {user.major}
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Facts */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">About Me:</h3>
          <ul className="space-y-2">
            {user.facts.map((fact, index) => (
              <li
                key={index}
                className="text-gray-700 text-sm flex items-start"
              >
                <span className="text-blue-500 mr-2">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        {user.tags.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {user.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Shortlisted Indicator */}
        {isShortlisted && (
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center text-blue-800">
              <Bookmark className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">
                Shortlisted for later review
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Swipe Hints */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex justify-between text-xs text-gray-400">
          <div className="flex items-center">
            <X className="h-4 w-4 mr-1" />
            <span>Reject</span>
          </div>
          <div className="flex items-center">
            <Bookmark className="h-4 w-4 mr-1" />
            <span>Shortlist</span>
          </div>
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-1" />
            <span>Accept</span>
          </div>
        </div>
      </div>
    </div>
  );
}
