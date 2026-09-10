import { GraphQLApi } from '@servicenow/sdk/core'
import "@servicenow/sdk/global";

GraphQLApi({
    $id: Now.ID['gql-lxp-progress'],
    name: 'LXP Progress GraphQL',
    namespace: 'lxpProgress',
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
        u_banner_image_link: String
        skill: [Skill]
        level: SkillLevel
        x_snc_nl_lxp_tags: [Tag]
      }

      type Progress {
        sys_id: ID!
        user: String
        content: Course
        status: String
        percentage: Int
        started_at: String
        completed_at: String
        last_accessed: String
        sys_created_on: String
        sys_updated_on: String
        number: String
        percent_complete: String
        state: String
        enrollment_date: String
        completion_date: String
      }

      type Query {
        progressRecords(limit: Int, user_id: String, content_id: String, status: String): [Progress]
        progressRecord(sys_id: ID!): Progress
      }
    `,
    resolvers: [
        {
            $id: Now.ID['progress-records-resolver'],
            name: 'progressRecordsResolver',
            paths: ['Query:progressRecords'],
            script: Now.include("../../server/resolvers/progress-records-resolver.js"),
        },
        {
            $id: Now.ID['progress-record-resolver'],
            name: 'progressRecordResolver',
            paths: ['Query:progressRecord'],
            script: Now.include("../../server/resolvers/progress-record-resolver.js"),
        },
        {
            $id: Now.ID['progress-content-resolver'],
            name: 'progressContentResolver',
            paths: ['Progress:content'],
            script: Now.include("../../server/resolvers/progress-content-resolver.js"),
        },
        {
            $id: Now.ID['progress-course-tags-resolver'],
            name: 'progressCourseTagsResolver',
            paths: ['Course:x_snc_nl_lxp_tags'],
            script: Now.include("../../server/resolvers/course-tags-resolver.js"),
        },
        {
            $id: Now.ID['progress-course-skill-resolver'],
            name: 'progressCourseSkillResolver',
            paths: ['Course:skill'],
            script: Now.include("../../server/resolvers/course-skill-resolver.js"),
        },
        {
            $id: Now.ID['progress-course-level-resolver'],
            name: 'progressCourseLevelResolver',
            paths: ['Course:level'],
            script: Now.include("../../server/resolvers/course-level-resolver.js"),
        },
    ],
})
