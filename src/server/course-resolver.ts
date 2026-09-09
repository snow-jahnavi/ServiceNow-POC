import { gs } from '@servicenow/glide'
// import { GlideRecord } from '@servicenow/glide'

const LOG_PREFIX = '[LXP GraphQL] '
const COURSE_FIELDS = 'sys_id,name,short_description,description,state,type,language,rating,duration,enrollment_count,view_count,active,published,number,content_id'

export function resolveCourses(env: any) {
    try {
        const args = env.getArguments()
        const limit = args.limit || 20
        const active = args.active
        const state = args.state

        // --- New: sn_lxp.LearningAPI implementation ---
        var learningAPI = new sn_lxp.LearningAPI();

        const queryParts: string[] = []
        if (active !== undefined && active !== null) {
            queryParts.push('active=' + active)
        }
        if (state) {
            queryParts.push('state=' + state)
        }
        const encodedQuery = queryParts.length > 0 ? queryParts.join('^') + '^ORDERBYDESCsys_created_on' : 'ORDERBYDESCsys_created_on'

        const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_content_base', encodedQuery, COURSE_FIELDS, limit)

        const courses: any[] = []
        for (let i = 0; i < results.length; i++) {
            const rec = results[i]
            courses.push({
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
            })
        }

        return courses

        // --- Old: GlideRecord implementation ---
        // const gr = new GlideRecord('sn_lxp_content_base')
        //
        // if (active !== undefined && active !== null) {
        //     gr.addQuery('active', active)
        // }
        // if (state) {
        //     gr.addQuery('state', state)
        // }
        //
        // gr.setLimit(limit)
        // gr.orderByDesc('sys_created_on')
        // gr.query()
        //
        // const courses: any[] = []
        // while (gr.next()) {
        //     courses.push({
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
        //     })
        // }
        //
        // return courses
    } catch (e: any) {
        gs.error(LOG_PREFIX + 'resolveCourses: ' + e.message)
        throw e
    }
}

export function resolveCourse(env: any) {
    try {
        const args = env.getArguments()
        const sysId = args.sys_id

        if (!sysId) {
            return null
        }

        // --- New: sn_lxp.LearningAPI implementation ---
        const learningAPI = new sn_lxp.LearningAPI()
        const encodedQuery = 'sys_id=' + sysId
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
        // if (gr.get(sysId)) {
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
        gs.error(LOG_PREFIX + 'resolveCourse: ' + e.message)
        throw e
    }
}
