(function process( /*ResolverEnvironment*/ env) {
    try {
        var PROGRESS_FIELDS = 'sys_id,user,content,status,percentage,started_at,completed_at,last_accessed,sys_created_on,sys_updated_on,number,percent_complete,state,enrollment_date,completion_date';

        var args = env.getArguments();
        var sysId = args.sys_id;

        if (!sysId) {
            return null;
        }

        var learningAPI = new sn_lxp.LearningAPI({ queryParams: {}}, {}, 1);
        var encodedQuery = 'sys_id=' + sysId;
        var results = learningAPI.getGlideRecordSecureSetData('sn_lxp_progress', encodedQuery, PROGRESS_FIELDS);

        if (results && results.items.length > 0) {
            var rec = results.items[0];
            return {
                sys_id: rec.sys_id || '',
                user: rec.user || '',
                content: rec.content || '',
                status: rec.status || '',
                percentage: parseInt(rec.percentage || '0', 10),
                started_at: rec.started_at || '',
                completed_at: rec.completed_at || '',
                last_accessed: rec.last_accessed || '',
                sys_created_on: rec.sys_created_on || '',
                sys_updated_on: rec.sys_updated_on || '',
                number: rec.number || '',
                percent_complete: rec.percent_complete || '',
                state: rec.state || '',
                enrollment_date: rec.enrollment_date || '',
                completion_date: rec.completion_date || '',
            };
        }

        return null;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveProgressRecord: ' + e.message);
        throw e;
    }
})(env);
