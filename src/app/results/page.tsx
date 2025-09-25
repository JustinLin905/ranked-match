"use client";

import { Heart, Users, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
  // In a real app, this would come from state management or API
  const acceptedMatches = [
    {
      id: "1",
      publicTitle: "Sick Basketball Player",
      major: "Computer Science",
      term: "3B",
    },
    {
      id: "2",
      publicTitle: "Coffee Addict",
      major: "Business Administration",
      term: "2A",
    },
    { id: "3", publicTitle: "Art Enthusiast", major: "Fine Arts", term: "4A" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <h1 className="text-2xl font-bold text-gray-900">Ranked Match</h1>
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Browse</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-green-500">
            <Heart className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Matching Complete!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              You've successfully reviewed all potential matches
            </p>
            <div className="bg-green-50 rounded-lg p-4 inline-block">
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-semibold">
                  {acceptedMatches.length} matches accepted
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Wait Message */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                What's Next?
              </h2>
              <p className="text-gray-600 mt-1">
                Please wait until the matching period is over. We'll notify you
                when mutual matches are found!
              </p>
            </div>
          </div>
        </div>

        {/* Accepted Matches */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Accepted Matches
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              These are the people you've shown interest in
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {acceptedMatches.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No matches yet
                </h3>
                <p className="text-gray-500">
                  Start browsing to find potential friends!
                </p>
              </div>
            ) : (
              acceptedMatches.map((match) => (
                <div
                  key={match.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {match.publicTitle.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {match.publicTitle}
                      </h3>
                      <p className="text-gray-500">
                        {match.major} • {match.term}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm font-medium">Accepted</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            How Matching Works
          </h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• We'll match you with people who also accepted you</li>
            <li>• Mutual matches will be revealed when the period ends</li>
            <li>• You'll receive contact information for your matches</li>
            <li>• Start planning your first meetup!</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Browse More People
          </Link>
          <button
            onClick={() => (window.location.href = "/matching")}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Review Again
          </button>
        </div>
      </div>
    </div>
  );
}
