import { GraphQLApi } from '@servicenow/sdk/core'
import { resolveCourses, resolveCourse } from '../server/course-resolver'
import { resolveUpdateCourseDescription } from '../server/course-update-resolver'

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
            script: resolveCourses,
        },
        {
            $id: Now.ID['course-resolver'],
            name: 'courseResolver',
            paths: ['Query:course'],
            script: resolveCourse,
        },
        {
            $id: Now.ID['update-course-desc-resolver'],
            name: 'updateCourseDescriptionResolver',
            paths: ['Mutation:updateCourseDescription'],
            script: resolveUpdateCourseDescription,
        },
    ],
})
