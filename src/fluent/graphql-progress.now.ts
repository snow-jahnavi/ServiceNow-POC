import { GraphQLApi } from '@servicenow/sdk/core'
import { resolveProgressRecords, resolveProgressRecord, resolveProgressContent } from '../server/progress-resolver'

GraphQLApi({
    $id: Now.ID['gql-lxp-progress'],
    name: 'LXP Progress GraphQL',
    namespace: 'lxpProgress',
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

      type Progress {
        sys_id: ID!
        user: String
        dv_user: String
        content: Course
        dv_content: String
        status: String
        dv_status: String
        percentage: Int
        started_at: String
        completed_at: String
        last_accessed: String
        sys_created_on: String
        sys_updated_on: String
        number: String
        percent_complete: String
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
            script: resolveProgressRecords,
        },
        {
            $id: Now.ID['progress-record-resolver'],
            name: 'progressRecordResolver',
            paths: ['Query:progressRecord'],
            script: resolveProgressRecord,
        },
        {
            $id: Now.ID['progress-content-resolver'],
            name: 'progressContentResolver',
            paths: ['Progress:content'],
            script: resolveProgressContent,
        },
    ],
})
