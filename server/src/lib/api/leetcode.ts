import axios from "axios";
import { Contest, ContestActivity } from "../../types/types";

export const checkLeetcodeProfileValidity = async (username: string): Promise<boolean> => {

  let data = JSON.stringify({
    query: `query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      activeBadge {
        displayName
        icon
      }
    }
  }`,
    variables: { "username": username }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://leetcode.com/graphql/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'csrftoken=hFP2XFU8Y0TtFkpDaTleHyZAA9CUIXykZTIKeInsOOM3a98z9aDRscgi45tTp1Cz'
    },
    data: data
  };

  const response = await axios.request(config);

  const matchedUserExists = response?.data?.data?.matchedUser ? true : false

  return matchedUserExists;
}

export const getLeetcodeProfileDetail = async (username: string, year: Number = new Date().getFullYear()) => {

  // retrieval of data
  let userPublicProfileQuery = JSON.stringify({
    query: `query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        contestBadge {
          name
          expired
          hoverText
          icon
        }
        username
        githubUrl
        twitterUrl
        linkedinUrl
        profile {
          ranking
          userAvatar
          realName
          aboutMe
          school
          websites
          countryName
          company
          jobTitle
          skillTags
          postViewCount
          postViewCountDiff
          reputation
          reputationDiff
          solutionCount
          solutionCountDiff
          categoryDiscussCount
          categoryDiscussCountDiff
        }
      }
    }`,
    variables: { "username": username }
  });

  let userPublicProfileConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://leetcode.com/graphql/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'csrftoken=hFP2XFU8Y0TtFkpDaTleHyZAA9CUIXykZTIKeInsOOM3a98z9aDRscgi45tTp1Cz'
    },
    data: userPublicProfileQuery
  };

  const { data: userPublicProfileData } = await axios.request(userPublicProfileConfig);

  let userProfileCalendarQuery = JSON.stringify({
    query: `query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        activeYears
        streak
        totalActiveDays
        dccBadges {
          timestamp
          badge {
            name
            icon
          }
        }
        submissionCalendar
      }
    }
  }`,
    variables: { "username": username, "year": year }
  });

  let userProfileCalendarConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://leetcode.com/graphql/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'csrftoken=hFP2XFU8Y0TtFkpDaTleHyZAA9CUIXykZTIKeInsOOM3a98z9aDRscgi45tTp1Cz'
    },
    data: userProfileCalendarQuery
  };

  const { data: userProfileCalendarData } = await axios.request(userProfileCalendarConfig);

  // let userSessionProgressQuery = JSON.stringify({
  //   query: `query userSessionProgress($username: String!) {
  //   allQuestionsCount {
  //     difficulty
  //     count
  //   }
  //   matchedUser(username: $username) {
  //     submitStats {
  //       acSubmissionNum {
  //         difficulty
  //         count
  //         submissions
  //       }
  //       totalSubmissionNum {
  //         difficulty
  //         count
  //         submissions
  //       }
  //     }
  //   }
  // }`,
  //   variables: { "username": username }
  // });

  // let userSessionProgressConfig = {
  //   method: 'post',
  //   maxBodyLength: Infinity,
  //   url: 'https://leetcode.com/graphql/',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Cookie': 'csrftoken=hFP2XFU8Y0TtFkpDaTleHyZAA9CUIXykZTIKeInsOOM3a98z9aDRscgi45tTp1Cz'
  //   },
  //   data: userSessionProgressQuery
  // };

  // const { data: userSessionProgressData } = await axios.request(userSessionProgressConfig);

  let userBadgesQuery = JSON.stringify({
    query: `query userBadges($username: String!) {
    matchedUser(username: $username) {
      badges {
        id
        name
        shortName
        displayName
        icon
        hoverText
        medal {
          slug
          config {
            iconGif
            iconGifBackground
          }
        }
        creationDate
        category
      }
      upcomingBadges {
        name
        icon
        progress
      }
    }
  }`,
    variables: { "username": username }
  });

  let userBadgesConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://leetcode.com/graphql/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'csrftoken=hFP2XFU8Y0TtFkpDaTleHyZAA9CUIXykZTIKeInsOOM3a98z9aDRscgi45tTp1Cz'
    },
    data: userBadgesQuery
  };

  const { data: userBadgesData } = await axios.request(userBadgesConfig);

  let userProblemsSolvedQuery = JSON.stringify({
    query: `query userProblemsSolved($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      problemsSolvedBeatsStats {
        difficulty
        percentage
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }`,
    variables: { "username": username }
  });

  let userProblemsSolvedConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://leetcode.com/graphql/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'csrftoken=hFP2XFU8Y0TtFkpDaTleHyZAA9CUIXykZTIKeInsOOM3a98z9aDRscgi45tTp1Cz'
    },
    data: userProblemsSolvedQuery
  };

  const { data: userProblemsSolved } = await axios.request(userProblemsSolvedConfig);

  let userContestRankingInfoQuery = JSON.stringify({
    query: `query userContestRankingInfo($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
      }
    }
    userContestRankingHistory(username: $username) {
      attended
      trendDirection
      problemsSolved
      totalProblems
      finishTimeInSeconds
      rating
      ranking
      contest {
        title
        startTime
      }
    }
  }`,
    variables: { "username": username }
  });

  let userContestRankingInfoConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://leetcode.com/graphql/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'csrftoken=hFP2XFU8Y0TtFkpDaTleHyZAA9CUIXykZTIKeInsOOM3a98z9aDRscgi45tTp1Cz'
    },
    data: userContestRankingInfoQuery
  };

  const { data: userContestRankingInfoData } = await axios.request(userContestRankingInfoConfig);

  let userSkillStatsQuery = JSON.stringify({
    query: `query skillStats($username: String!) {
    matchedUser(username: $username) {
      tagProblemCounts {
        advanced {
          tagName
          tagSlug
          problemsSolved
        }
        intermediate {
          tagName
          tagSlug
          problemsSolved
        }
        fundamental {
          tagName
          tagSlug
          problemsSolved
        }
      }
    }
  }`,
    variables: { "username": username }
  });

  let userSkillStatsConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://leetcode.com/graphql/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'csrftoken=hFP2XFU8Y0TtFkpDaTleHyZAA9CUIXykZTIKeInsOOM3a98z9aDRscgi45tTp1Cz'
    },
    data: userSkillStatsQuery
  };

  const { data: userSkillStatsData } = await axios.request(userSkillStatsConfig);

  let languageStatsQuery = JSON.stringify({
    query: `query languageStats($username: String!) {
    matchedUser(username: $username) {
      languageProblemCount {
        languageName
        problemsSolved
      }
    }
  }`,
    variables: { "username": username }
  });

  let languageStatsConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://leetcode.com/graphql/',
    headers: {
      'Content-Type': 'application/json'
    },
    data: languageStatsQuery
  };

  const { data: languageStatsData } = await axios.request(languageStatsConfig);

  // formatting of data
  const parsedData = JSON.parse(userProfileCalendarData?.data?.matchedUser?.userCalendar?.submissionCalendar);
  
  const contestActivityList = userContestRankingInfoData?.data?.userContestRankingHistory
  .reduce((acc: ContestActivity[], contest: Contest) => {
    if (contest?.attended) {
      acc.push({
        problemsSolved: contest?.problemsSolved,
        totalProblems: contest?.totalProblems,
        rating: contest?.rating,
        ranking: contest?.ranking,
        title: contest?.contest?.title,
        startTime: contest?.contest?.startTime,
      });
    }
    return acc;
  }, []);

  return {
    platform: "leetcode",
    platformCode: 0,
    platformType: ["dsa", "cp"],
    userStats: {
      username: userPublicProfileData?.data?.matchedUser?.username,
      plaformRank: userPublicProfileData?.data?.matchedUser?.profile?.ranking,
      contestRank: userContestRankingInfoData?.data?.userContestRanking?.globalRanking,
      userAvatar: userPublicProfileData?.data?.matchedUser?.profile?.userAvatar,
      stars: userPublicProfileData?.data?.matchedUser?.profile?.reputation,
      contestBadge: {
        name: userPublicProfileData?.data?.matchedUser?.contestBadge?.name,
        hoverText: userPublicProfileData?.data?.matchedUser?.contestBadge?.hoverText,
        icon: userPublicProfileData?.data?.matchedUser?.contestBadge?.icon,
      },
      languageList: languageStatsData?.data?.matchedUser?.languageProblemCount?.map((languageData: {
        languageName: string;
        problemsSolved: number;
      }) => {
        return {
          languageName: languageData?.languageName,
          problemsSolved: languageData?.problemsSolved,
        }
      }),
    },
    badgeStats: {
      badgeList: userBadgesData?.data?.matchedUser?.badges?.map((badge: {
        id: string;
        name: string;
        shortName: string;
        displayName: string;
        icon: string;
        hoverText: string;
        medal: {
          slug: string;
          config: {
            iconGif: string;
            iconGifBackground: string;
          }
        },
        creationDate: string;
        category: string;
      }) => {
        return {
          name: badge?.name,
          shortName: badge?.shortName,
          displayName: badge?.displayName,
          hoverText: badge?.hoverText,
          icon: badge?.icon,
          creationDate: new Date(badge?.creationDate),
          category: badge?.category,
          medal: {
            iconGif: badge?.medal?.config?.iconGif,
            iconGifBackground: badge?.medal?.config?.iconGifBackground,
          }
        }
      })
    },
    topicAnalysisStats: {
      topicWiseDistribution: {
        ...userSkillStatsData?.data?.matchedUser?.tagProblemCounts?.advanced?.reduce((acc: Record<string, number>, skillTag: { tagName: string; problemsSolved: number }) => {
          acc[skillTag.tagName] = skillTag.problemsSolved;
          return acc;
        }, {}),
      
        ...userSkillStatsData?.data?.matchedUser?.tagProblemCounts?.intermediate?.reduce((acc: Record<string, number>, skillTag: { tagName: string; problemsSolved: number }) => {
          acc[skillTag.tagName] = skillTag.problemsSolved;
          return acc;
        }, {}),
      
        ...userSkillStatsData?.data?.matchedUser?.tagProblemCounts?.fundamental?.reduce((acc: Record<string, number>, skillTag: { tagName: string; problemsSolved: number }) => {
          acc[skillTag.tagName] = skillTag.problemsSolved;
          return acc;
        }, {})
      }
    },
    totalQuestionStats: {
      totalQuestionAccepted: userProblemsSolved?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum[0]?.count,
      easyQuestionAccepted: userProblemsSolved?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum[1]?.count,
      mediumQuestionAccepted: userProblemsSolved?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum[2]?.count,
      hardQuestionAccepted: userProblemsSolved?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum[3]?.count,
    },
    contestActivityStats: {
      rating: userContestRankingInfoData?.data?.userContestRanking?.rating,
      attendedContestsCount: userContestRankingInfoData?.data?.userContestRanking?.attendedContestsCount,
      globalRanking: userContestRankingInfoData?.data?.userContestRanking?.globalRanking,
      totalParticipants: userContestRankingInfoData?.data?.userContestRanking?.totalParticipants,
      topPercentage: userContestRankingInfoData?.data?.userContestRanking?.topPercentage,
      contestActivityList: contestActivityList,
    },
    dailyActivityStats: {
      userCalendar: {
        activeYears: userProfileCalendarData?.data?.matchedUser?.userCalendar?.activeYears,
        streak: [{
          year: year,
          maxStreak: userProfileCalendarData?.data?.matchedUser?.userCalendar?.streak,
          totalActiveDays: userProfileCalendarData?.data?.matchedUser?.userCalendar?.totalActiveDays,
        }],
        submissionCalendar: [{
          year: year,
          submissionMap: parsedData,
        }]
      }
    },
  }

}