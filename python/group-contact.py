import argparse
import csv
from typing import List, Tuple

import openpyxl
import sys

vcard = """begin:vcard
version:3.0
n:{first_name};{last_name};;;
fn:{full_name}
{items}end:vcard"""

vcard_item = 'item{index}.tel:{number}\nitem{index}.X-ABLabel:{name}\n'


class Error(Exception):
    """Base class for exceptions in this module."""
    pass


def read_contacts(filename: str) -> List[Tuple[str, str]]:
    """
    :return: a list of tuples (name, number)
    """

    contacts = []

    try:
        workbook = openpyxl.load_workbook(filename)
        sheet = workbook.worksheets[0]
        all_columns = sheet.columns
        # TODO read contacts from xlsx
    except:
        with open(filename) as file:
            reader = csv.reader(file, delimiter=',')
            contacts = [
                (row[0], row[1]) for row in reader
            ]

    return contacts


def create_vcard(group_name, contacts):
    first_name, last_name = tuple(group_name.split(' ', 1))
    items = ''.join([
        vcard_item.format(index=index, name=name, number=number)
        for index, (name, number) in enumerate(contacts)
    ])
    return vcard.format(
        first_name=first_name,
        last_name=last_name,
        full_name=group_name,
        items=items
    )


parser = argparse.ArgumentParser()  # TODO add usage
parser.add_argument('filename')
parser.add_argument('--group_name')
# TODO add primary contact
args = parser.parse_args()

try:
    contacts = read_contacts(args.filename)
except Error as e:
    sys.exit(f'Could not read contacts. Reason: {e}')

vcard = create_vcard(
    args.group_name,
    contacts
)

with open(f'{args.group_name}.vcf', 'w') as outfile:
    outfile.write(vcard)
