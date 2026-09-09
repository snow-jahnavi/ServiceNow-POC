import { GraphQLApi } from '@servicenow/sdk/core'
import "@servicenow/sdk/global";

GraphQLApi({
    $id: Now.ID['gql-lxp-achievement'],
    name: 'LXP Achievement GraphQL',
    namespace: 'lxpAchievement',
    requiresSncInternalRole: false,
    schema: `
      type Achievement {
        sys_id: ID!
        name: String
        description: String
        user: String
        achievement_type: String
        badge: String
        points: Int
        earned_on: String
        active: Boolean
        sys_created_on: String
        sys_updated_on: String
      }

      type Query {
        achievements(limit: Int, user_id: String, achievement_type: String, active: Boolean): [Achievement]
        achievement(sys_id: ID!): Achievement
      }
    `,
    resolvers: [
        {
            $id: Now.ID['achievements-resolver'],
            name: 'achievementsResolver',
            paths: ['Query:achievements'],
            script: Now.include("../../server/resolvers/achievements-resolver.js"),
        },
        {
            $id: Now.ID['achievement-resolver'],
            name: 'achievementResolver',
            paths: ['Query:achievement'],
            script: Now.include("../../server/resolvers/achievement-single-resolver.js"),
        },
    ],
})
