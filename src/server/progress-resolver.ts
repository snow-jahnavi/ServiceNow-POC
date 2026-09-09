import { gs } from '@servicenow/glide'
// import { GlideRecord } from '@servicenow/glide'

const LOG_PREFIX = '[LXP GraphQL] '
const PROGRESS_FIELDS = 'sys_id,user,content,status,percentage,started_at,completed_at,last_accessed,sys_created_on,sys_updated_on,number,percent_complete'
const COURSE_FIELDS = 'sys_id,name,short_description,description,state,type,language,rating,duration,enrollment_count,view_count,active,published,number,content_id'

export function resolveProgressRecords(env: any) {
    try {
        const args = env.getArguments()
        const limit = args.limit || 20
        const userId = args.user_id
        const contentId = args.content_id
        const status = args.status

        // --- New: sn_lxp.LearningAPI implementation ---
        const learningAPI = new sn_lxp.LearningAPI()

        const queryParts: string[] = []
        if (userId) {
            queryParts.push('user=' + userId)
        }
        if (contentId) {
            queryParts.push('content=' + contentId)
        }
        if (status) {
            queryParts.push('status=' + status)
        }
        const encodedQuery = queryParts.length > 0 ? queryParts.join('^') + '^ORDERBYDESCsys_created_on' : 'ORDERBYDESCsys_created_on'

        const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_progress', encodedQuery, PROGRESS_FIELDS, limit)

        const records: any[] = []
        for (let i = 0; i < results.length; i++) {
            const rec = results[i]
            records.push({
                sys_id: rec.getValue('sys_id') || '',
                user: rec.getValue('user') || '',
                content: rec.getValue('content') || '',
                status: rec.getValue('status') || '',
                percentage: parseInt(rec.getValue('percentage') || '0', 10),
                started_at: rec.getValue('started_at') || '',
                completed_at: rec.getValue('completed_at') || '',
                last_accessed: rec.getValue('last_accessed') || '',
                sys_created_on: rec.getValue('sys_created_on') || '',
                sys_updated_on: rec.getValue('sys_updated_on') || '',
                number: rec.getValue('number') || '',
                percent_complete: rec.getValue('percent_complete') || '',
            })
        }

        return records

        // --- Old: GlideRecord implementation ---
        // const gr = new GlideRecord('sn_lxp_progress')
        //
        // if (userId) {
        //     gr.addQuery('user', userId)
        // }
        // if (contentId) {
        //     gr.addQuery('content', contentId)
        // }
        // if (status) {
        //     gr.addQuery('status', status)
        // }
        //
        // gr.setLimit(limit)
        // gr.orderByDesc('sys_created_on')
        // gr.query()
        //
        // const records: any[] = []
        // while (gr.next()) {
        //     records.push({
        //         sys_id: gr.getUniqueValue(),
        //         user: gr.getDisplayValue('user') || '',
        //         content: gr.getValue('content') || '',
        //         status: gr.getValue('status') || '',
        //         percentage: parseInt(gr.getValue('percentage') || '0', 10),
        //         started_at: gr.getValue('started_at') || '',
        //         completed_at: gr.getValue('completed_at') || '',
        //         last_accessed: gr.getValue('last_accessed') || '',
        //         sys_created_on: gr.getValue('sys_created_on') || '',
        //         sys_updated_on: gr.getValue('sys_updated_on') || '',
        //         number: gr.getValue('number') || '',
        //         percent_complete: gr.getValue('percent_complete') || '',
        //     })
        // }
        //
        // return records
    } catch (e: any) {
        gs.error(LOG_PREFIX + 'resolveProgressRecords: ' + e.message)
        throw e
    }
}

export function resolveProgressRecord(env: any) {
    try {
        const args = env.getArguments()
        const sysId = args.sys_id

        if (!sysId) {
            return null
        }

        // --- New: sn_lxp.LearningAPI implementation ---
        const learningAPI = new sn_lxp.LearningAPI()
        const encodedQuery = 'sys_id=' + sysId
        const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_progress', encodedQuery, PROGRESS_FIELDS, 1)

        if (results && results.length > 0) {
            const rec = results[0]
            return {
                sys_id: rec.getValue('sys_id') || '',
                user: rec.getValue('user') || '',
                content: rec.getValue('content') || '',
                status: rec.getValue('status') || '',
                percentage: parseInt(rec.getValue('percentage') || '0', 10),
                started_at: rec.getValue('started_at') || '',
                completed_at: rec.getValue('completed_at') || '',
                last_accessed: rec.getValue('last_accessed') || '',
                sys_created_on: rec.getValue('sys_created_on') || '',
                sys_updated_on: rec.getValue('sys_updated_on') || '',
                number: rec.getValue('number') || '',
                percent_complete: rec.getValue('percent_complete') || '',
            }
        }

        return null

        // --- Old: GlideRecord implementation ---
        // const gr = new GlideRecord('sn_lxp_progress')
        // if (gr.get(sysId)) {
        //     return {
        //         sys_id: gr.getUniqueValue(),
        //         user: gr.getDisplayValue('user') || '',
        //         content: gr.getValue('content') || '',
        //         status: gr.getValue('status') || '',
        //         percentage: parseInt(gr.getValue('percentage') || '0', 10),
        //         started_at: gr.getValue('started_at') || '',
        //         completed_at: gr.getValue('completed_at') || '',
        //         last_accessed: gr.getValue('last_accessed') || '',
        //         sys_created_on: gr.getValue('sys_created_on') || '',
        //         sys_updated_on: gr.getValue('sys_updated_on') || '',
        //         number: gr.getValue('number') || '',
        //         percent_complete: gr.getValue('percent_complete') || '',
        //     }
        // }
        //
        // return null
    } catch (e: any) {
        gs.error(LOG_PREFIX + 'resolveProgressRecord: ' + e.message)
        throw e
    }
}

export function resolveProgressContent(env: any) {
    try {
        const source = env.getSource()
        const contentSysId = source.content

        if (!contentSysId) {
            return null
        }

        // --- New: sn_lxp.LearningAPI implementation ---
        const learningAPI = new sn_lxp.LearningAPI()
        const encodedQuery = 'sys_id=' + contentSysId
        const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_content_base', encodedQuery, COURSE_FIELDS, 1)

        if (results && results.length > 0) {
            const rec = results[0]
            return {
                sys_id: rec.getValue('sys_id') || '',
                name: rec.getValue('name') || '',
                short_description: rec.getValue('short_description') || '',
                description: rec.getValue('description') || '',
                state: rec.getValue('state') || '',
                type: rec.getValue('type') || '',
                language: rec.getValue('language') || '',
                rating: parseFloat(rec.getValue('rating') || '0'),
                duration: rec.getValue('duration') || '',
                enrollment_count: parseInt(rec.getValue('enrollment_count') || '0', 10),
                view_count: parseInt(rec.getValue('view_count') || '0', 10),
                active: rec.getValue('active') === 'true',
                published: rec.getValue('published') || '',
                number: rec.getValue('number') || '',
                content_id: rec.getValue('content_id') || '',
            }
        }

        return null

        // --- Old: GlideRecord implementation ---
        // const gr = new GlideRecord('sn_lxp_content_base')
        // if (gr.get(contentSysId)) {
        //     return {
        //         sys_id: gr.getUniqueValue(),
        //         name: gr.getValue('name') || '',
        //         short_description: gr.getValue('short_description') || '',
        //         description: gr.getValue('description') || '',
        //         state: gr.getValue('state') || '',
        //         type: gr.getValue('type') || '',
        //         language: gr.getValue('language') || '',
        //         rating: parseFloat(gr.getValue('rating') || '0'),
        //         duration: gr.getValue('duration') || '',
        //         enrollment_count: parseInt(gr.getValue('enrollment_count') || '0', 10),
        //         view_count: parseInt(gr.getValue('view_count') || '0', 10),
        //         active: gr.getValue('active') === 'true',
        //         published: gr.getValue('published') || '',
        //         number: gr.getValue('number') || '',
        //         content_id: gr.getValue('content_id') || '',
        //     }
        // }
        //
        // return null
    } catch (e: any) {
        gs.error(LOG_PREFIX + 'resolveProgressContent: ' + e.message)
        throw e
    }
}
