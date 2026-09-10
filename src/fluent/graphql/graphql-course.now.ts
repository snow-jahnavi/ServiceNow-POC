import { GraphQLApi } from '@servicenow/sdk/core'
import "@servicenow/sdk/global";

GraphQLApi({
    $id: Now.ID['gql-lxp-course'],
    name: 'LXP Course GraphQL',
    namespace: 'lxpCourse',
    requiresSncInternalRole: false,
    schema: `
      schema {
        query: Query
        mutation: Mutation
      }

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

      type UpdateCourseDescriptionResult {
        success: Boolean!
        message: String
        course: Course
      }

      type Query {
        courses(limit: Int, active: Boolean, state: String): [Course]
        course(sys_id: ID!): Course
      }

      type Mutation {
        updateCourseDescription(sys_id: ID!, description: String!): UpdateCourseDescriptionResult
      }
    `,
    resolvers: [
        {
            $id: Now.ID['courses-resolver'],
            name: 'coursesResolver',
            paths: ['Query:courses'],
            script: Now.include("../../server/resolvers/course-resolver.js"),
        },
        {
            $id: Now.ID['course-resolver'],
            name: 'courseResolver',
            paths: ['Query:course'],
            script: Now.include("../../server/resolvers/course-single-resolver.js"),
        },
        {
            $id: Now.ID['update-course-desc-resolver'],
            name: 'updateCourseDescriptionResolver',
            paths: ['Mutation:updateCourseDescription'],
            script: Now.include("../../server/resolvers/course-update-desc-resolver.js"),
        },
        {
            $id: Now.ID['course-tags-resolver'],
            name: 'courseTagsResolver',
            paths: ['Course:x_snc_nl_lxp_tags'],
            script: Now.include("../../server/resolvers/course-tags-resolver.js"),
        },
        {
            $id: Now.ID['course-skill-resolver'],
            name: 'courseSkillResolver',
            paths: ['Course:skill'],
            script: Now.include("../../server/resolvers/course-skill-resolver.js"),
        },
        {
            $id: Now.ID['course-level-resolver'],
            name: 'courseLevelResolver',
            paths: ['Course:level'],
            script: Now.include("../../server/resolvers/course-level-resolver.js"),
        },
    ],
})
