import { GraphQLApi } from '@servicenow/sdk/core'
import "@servicenow/sdk/global";

GraphQLApi({
    $id: Now.ID['gql-lxp-user-achievement'],
    name: 'LXP User Achievement GraphQL',
    namespace: 'lxpUserAchievement',
    requiresSncInternalRole: false,
    schema: `
      type Tag {
        sys_id: ID!
        name: String
        active: Boolean
      }

      type Skill {
        sys_id: ID!
        name: String
        description: String
        active: Boolean
        keywords: String
        display_skill_name: String
      }

      type SkillLevel {
        sys_id: ID!
        name: String
        description: String
        value: Int
        color: String
      }

      type Course {
        sys_id: ID!
        name: String
        short_description: String
        description: String
        state: String
        type: String
        language: String
        rating: Float
        duration: String
        enrollment_count: Int
        view_count: Int
        active: Boolean
        published: String
        number: String
        content_id: String
        link: String
        u_banner_image: String
        skill: [Skill]
        level: SkillLevel
        x_snc_nl_lxp_tags: [Tag]
      }

      type Achievement {
        sys_id: ID!
        name: String
        description: String
        achievement_type: String
        badge: String
        points: Int
        active: Boolean
        sys_created_on: String
        sys_updated_on: String
      }

      type UserAchievement {
        sys_id: ID!
        user: String
        content: Course
        achievement: Achievement
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
            script: Now.include("../../server/resolvers/user-achievements-resolver.js"),
        },
        {
            $id: Now.ID['user-achievement-resolver'],
            name: 'userAchievementResolver',
            paths: ['Query:userAchievement'],
            script: Now.include("../../server/resolvers/user-achievement-single-resolver.js"),
        },
        {
            $id: Now.ID['user-achievement-content-resolver'],
            name: 'userAchievementContentResolver',
            paths: ['UserAchievement:content'],
            script: Now.include("../../server/resolvers/user-achievement-content-resolver.js"),
        },
        {
            $id: Now.ID['user-achievement-achievement-resolver'],
            name: 'userAchievementAchievementResolver',
            paths: ['UserAchievement:achievement'],
            script: Now.include("../../server/resolvers/user-achievement-achievement-resolver.js"),
        },
        {
            $id: Now.ID['user-achievement-course-tags-resolver'],
            name: 'userAchievementCourseTagsResolver',
            paths: ['Course:x_snc_nl_lxp_tags'],
            script: Now.include("../../server/resolvers/course-tags-resolver.js"),
        },
        {
            $id: Now.ID['user-achievement-course-skill-resolver'],
            name: 'userAchievementCourseSkillResolver',
            paths: ['Course:skill'],
            script: Now.include("../../server/resolvers/course-skill-resolver.js"),
        },
        {
            $id: Now.ID['user-achievement-course-level-resolver'],
            name: 'userAchievementCourseLevelResolver',
            paths: ['Course:level'],
            script: Now.include("../../server/resolvers/course-level-resolver.js"),
        },
    ],
})
