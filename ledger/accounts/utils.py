import requests
import json
from django.conf import settings
from django.core.cache import cache

def in_dbca_domain(user):
    domain = user.email.split('@')[1]
    if domain in settings.DEPT_DOMAINS:
#        if not user.is_staff:
#            # hack to reset department user to is_staff==True, if the user logged in externally (external departmentUser login defaults to is_staff=False)
#            user.is_staff = True
#            user.save()
        return True
    return False

def get_department_user_minimal(email):
    try:
        res = requests.get('{}/api/users/?minimal&email={}'.format(settings.CMS_URL,email), auth=(settings.LEDGER_USER,settings.LEDGER_PASS), verify=False)
        res.raise_for_status()
        data = json.loads(res.content).get('objects')
        if len(data) > 0:
            user_obj = data[0]
            if 'cost_centre' in user_obj and user_obj.get('cost_centre', {}).get('code'):
                return user_obj
        return {}
    except:
        return {}

def get_department_user_compact(email):
    try:
        res = requests.get('{}/api/users/fast/?compact&email={}'.format(settings.CMS_URL,email), auth=(settings.LEDGER_USER,settings.LEDGER_PASS), verify=False)
        res.raise_for_status()
        data = json.loads(res.content).get('objects')
        if len(data) > 0:
            user_obj = data[0]
            if 'cost_centre' in user_obj and user_obj.get('cost_centre', {}).get('code'):
                return user_obj
        return {}
    except:
        return {}


def remove_html_tags(text):
    HTML_TAGS_WRAPPED = re.compile(r'<[^>]+>.+</[^>]+>')
    HTML_TAGS_NO_WRAPPED = re.compile(r'<[^>]+>')

    text = HTML_TAGS_WRAPPED.sub('', text)
    text = HTML_TAGS_NO_WRAPPED.sub('', text)
    return text
