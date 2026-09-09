(function process( /*ResolverEnvironment*/ env) {
    try {
        var ACHIEVEMENT_FIELDS = 'sys_id,name,description,user,achievement_type,badge,points,earned_on,active,sys_created_on,sys_updated_on';

        var args = env.getArguments();
        var sysId = args.sys_id;

        if (!sysId) {
            return null;
        }

        var learningAPI = new sn_lxp.LearningAPI({ queryParams: {}}, {}, 1);
        var encodedQuery = 'sys_id=' + sysId;
        var results = learningAPI.getGlideRecordSecureSetData('sn_lxp_achievement', encodedQuery, ACHIEVEMENT_FIELDS);

        if (results && results.items.length > 0) {
            var rec = results.items[0];
            return {
                sys_id: rec.sys_id || '',
                name: rec.name || '',
                description: rec.description || '',
                user: rec.user || '',
                achievement_type: rec.achievement_type || '',
                badge: rec.badge || '',
                points: parseInt(rec.points || '0', 10),
                earned_on: rec.earned_on || '',
                active: rec.active === 'true',
                sys_created_on: rec.sys_created_on || '',
                sys_updated_on: rec.sys_updated_on || '',
            };
        }

        return null;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveAchievement: ' + e.message);
        throw e;
    }
})(env);
