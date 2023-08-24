$(document).ready(function () {
    $('#loading').hide();
  });

  function chatGPT() {
    const api_key = "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"  // <- API KEY 입력
    const keywords = document.getElementById('keywords').value
    $('#loading').show();

    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: keywords + '에 대하여 최대한 도움이 되는 답변을 해줘.' },
    ]

    const data = {
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      n: 1,
      messages: messages,
    }

    $.ajax({
      url: "https://api.openai.com/v1/chat/completions",
      method: 'POST',
      headers: {
        Authorization: "Bearer " + api_key,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    }).then(function (response) {
      $('#loading').hide();
      console.log(response)
      let result = document.getElementById('result')
      let pre = document.createElement('pre')

      pre.innerHTML = "\n\n" + response.choices[0].message.content
      result.appendChild(pre)

      document.getElementById('keywords').value = ''
    });
  }