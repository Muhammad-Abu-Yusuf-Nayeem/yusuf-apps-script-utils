function testAllUtilities() {
  Logger.log('isBlank: %s', isBlank('   '));
  Logger.log('normalizeText: %s', normalizeText('  Abu   Yusuf  '));
  Logger.log('cleanName: %s', cleanName('  md. abu   yusuf nayeem  '));
  Logger.log('toNumber: %s', toNumber('৳1,25,000'));
  Logger.log('toBoolean: %s', toBoolean('Yes'));
  Logger.log('parseDate: %s', parseDate('18.11.2024'));
  Logger.log('formatDate: %s', formatDate(parseDate('18.11.2024')));
  Logger.log('email: %s', isValidEmail('yusuf@gmail.com'));
  Logger.log('phone: %s', isValidPhone('+8801712345678'));
  Logger.log('id: %s', generateId());

  const record = cleanRecord({
    name: '  MD.   RAHIM UDDIN ',
    amount: ' 1,25,000 ',
    date: '25.05.2025',
    email: ' RAHIM@EXAMPLE.COM ',
    phone: '+8801712345678'
  });

  Logger.log('cleanRecord: %s', JSON.stringify(record));
}
