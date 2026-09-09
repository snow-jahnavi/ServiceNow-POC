import { GraphQLApi } from '@servicenow/sdk/core'
import {
    resolveUserAchievements,
    resolveUserAchievement,
    resolveUserAchievementContent,
    resolveUserAchievementAchievement,
} from '../server/user-achievement-resolver'

GraphQLApi({
    $id: Now.ID['gql-lxp-user-achievement'],
    name: 'LXP User Achievement GraphQL',
    namespace: 'lxpUserAchievement',
    requiresSncInternalRole: false,
    schema: `
      type Course {
        sys_id: ID!
        name: String
        short_description: String
        description: String
        state: String
        dv_state: String
        type: String
        dv_type: String
        language: String
        dv_language: String
        rating: Float
        duration: String
        enrollment_count: Int
        view_count: Int
        active: Boolean
        published: String
        dv_published: String
        number: String
        content_id: String
      }

      type Achievement {
        sys_id: ID!
        name: String
        description: String
        achievement_type: String
        dv_achievement_type: String
        badge: String
        dv_badge: String
        points: Int
        active: Boolean
        sys_created_on: String
        sys_updated_on: String
      }

      type UserAchievement {
        sys_id: ID!
        user: String
        dv_user: String
        content: Course
        dv_content: String
        achievement: Achievement
        dv_achievement: String
        earned_on: String
        number: String
        sys_created_on: String
        sys_updated_on: String
      }

      type Query {
        userAchievements(limit: Int, user_id: String): [UserAchievement]
        userAchievement(sys_id: ID!): UserAchievement
      }
    `,
    resolvers: [
        {
            $id: Now.ID['user-achievements-resolver'],
            name: 'userAchievementsResolver',
            paths: ['Query:userAchievements'],
            script: resolveUserAchievements,
        },
        {
            $id: Now.ID['user-achievement-resolver'],
            name: 'userAchievementResolver',
            paths: ['Query:userAchievement'],
            script: resolveUserAchievement,
        },
        {
            $id: Now.ID['user-achievement-content-resolver'],
            name: 'userAchievementContentResolver',
            paths: ['UserAchievement:content'],
            script: resolveUserAchievementContent,
        },
        {
            $id: Now.ID['user-achievement-achievement-resolver'],
            name: 'userAchievementAchievementResolver',
            paths: ['UserAchievement:achievement'],
            script: resolveUserAchievementAchievement,
        },
    ],
})
