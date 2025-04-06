import { parser } from '@lezer/javascript'
import { Code, LezerHighlighter, makeScene2D, Rect } from '@revideo/2d'
import { createRef, makeProject } from '@revideo/core'
import { 清空 } from './components/clear'
import { 列表组件 } from './components/list'
import { 主标题组件 } from './components/title'
import { 小节标题组件 } from './components/title-section'
import { tts } from './components/tts'

let 我的视频 = makeScene2D('我的视频', function* (view) {
  view.add(<Rect width={'100%'} height={'100%'} fill={'#123456'} />)

  let 字幕区域 = createRef<Rect>()
  let 展示区域 = createRef<Rect>()
  let 代码区域 = createRef<Rect>()
  view.add(<Rect ref={展示区域} />)
  view.add(<Rect ref={代码区域} />)
  view.add(<Rect ref={字幕区域} y={450} />)

  yield* 清空(展示区域())
  yield* 主标题组件(展示区域(), '讲讲 MCP 协议', '')
  yield* tts(字幕区域(), '这个视频讲讲MCP协议.')

  yield* 清空(展示区域())
  yield* 小节标题组件(展示区域(), '控制大语言模型输出形状')
  yield* tts(字幕区域(), '因为总是有人在讨论MCP和函数调用之间的关系, 所以也简单讲一下函数调用.')
  yield* tts(字幕区域(), '大语言模型很难和其他程序协作. 因为程序接受的是形式化的字符串, 例如JSON之类的.')

  yield* tts(字幕区域(), '为了解决这个问题, 最开始提出了"函数调用"的方法.')
  yield* 清空(展示区域())
  展示区域().add(
    <>
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={50}
        code={`
// https://platform.openai.com/docs/guides/text?api-mode=chat
const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
            role: "developer",
            content: "Talk like a pirate."
        },
        {
            role: "user",
            content: "Are semicolons optional in JavaScript?",
        },
    ],
});

          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '这是最简单的调用大语言模型的写法.')
  yield* tts(字幕区域(), '没什么可说的, 只需要指定模型和对话上下文即可.')

  yield* 清空(展示区域())
  展示区域().add(
    <>
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={30}
        code={`
// https://platform.openai.com/docs/guides/function-calling?api-mode=chat
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current temperature for a given location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and country e.g. Bogotá, Colombia"
                }
            },
            "required": [
                "location"
            ],
            "additionalProperties": False
        },
        "strict": True
    }
}]

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "What is the weather like in Paris today?"}],
    tools=tools
)
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '这是函数调用的写法.')
  yield* tts(字幕区域(), '和刚才的写法类似, 唯一的区别就是多了一个tools字段.')
  yield* tts(字幕区域(), '这个tools里描述了一个函数, 说明了这个函数的名称, 描述, 每个参数的类型等信息.')
  yield* tts(字幕区域(), '注意, 你描述的这个函数不一定真的要存在, 这其实只是另一种形式的提示词而已.')
  yield* tts(字幕区域(), '这样调用的话, 大语言模型就会根据对话, 决定要不要"调用"这个函数.')
  yield* tts(字幕区域(), '这里的"调用"是带引号的, 大语言模型并没有真的去执行这个函数, 只是返回出了调用函数需要的信息.')

  yield* 清空(展示区域())
  展示区域().add(
    <>
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={50}
        code={`
[{
    "id": "call_12345xyz",
    "type": "function",
    "function": {
        "name": "get_weather",
        "arguments": "{\"location\":\"Paris, France\"}"
    }
}]
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '这就是返回结果, 只是给出了模型想调用的函数的名称和参数.')
  yield* tts(字幕区域(), '注意到这里返回的结果是一个完美的JSON.')
  yield* tts(字幕区域(), '这样我们的程序可以解析这段JSON, 真正的调用函数.')

  yield* 清空(展示区域())
  yield* tts(字幕区域(), '类似的技术还有结构化输出和JSON模式.')

  yield* 清空(展示区域())
  展示区域().add(
    <>
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={30}
        code={`
// https://platform.openai.com/docs/guides/structured-outputs?api-mode=chat
const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const MathReasoning = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});

const completion = await openai.beta.chat.completions.parse({
  model: "gpt-4o-2024-08-06",
  messages: [
    { role: "system", content: "You are a helpful math tutor. Guide the user through the solution step by step." },
    { role: "user", content: "how can I solve 8x + 7 = -23" },
  ],
  response_format: zodResponseFormat(MathReasoning, "math_reasoning"),
});
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '结构化输出的写法是这样的.')
  yield* tts(字幕区域(), '和普通调用的区别是, 这里需要多传一个response_format字段, 而这个字段是一个用zod描述的形状.')

  yield* 清空(展示区域())
  展示区域().add(
    <>
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={30}
        code={`
{
  "steps": [
    {
      "explanation": "Start with the equation 8x + 7 = -23.",
      "output": "8x + 7 = -23"
    },
    {
      "explanation": "Subtract 7 from both sides to isolate the term with the variable.",
      "output": "8x = -23 - 7"
    },
    {
      "explanation": "Simplify the right side of the equation.",
      "output": "8x = -30"
    },
    {
      "explanation": "Divide both sides by 8 to solve for x.",
      "output": "x = -30 / 8"
    },
    {
      "explanation": "Simplify the fraction.",
      "output": "x = -15 / 4"
    }
  ],
  "final_answer": "x = -15 / 4"
}
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '结果是这样的.')
  yield* tts(字幕区域(), '注意到输出的结果就是zod描述的形状.')

  yield* 清空(展示区域())
  展示区域().add(
    <>
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={30}
        code={`
// https://platform.openai.com/docs/guides/structured-outputs?api-mode=chat#json-mode
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: "Who won the world series in 2020? Please respond in the format {winner: ...}" },
    ],
    store: true,
    response_format: { type: "json_object" },
  });
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '而这是JSON模式的写法.')
  yield* tts(字幕区域(), '没有什么特别的, 只是response_format字段要写成type: "json_object".')
  yield* tts(字幕区域(), '甚至不需要单独的描述形状的字段, 直接在提示词里描述JSON的形状即可.')

  yield* 清空(展示区域())
  yield* tts(字幕区域(), '公平的说, 结构化输出或JSON模式也可以实现函数调用的效果.')
  展示区域().add(
    <>
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={50}
        code={`
{ name: string, arguments: string[] }
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '很容易想象, 你可以让大语言模型返回一个这样形状的结果, 或者类似形状的结果.')
  yield* tts(字幕区域(), '然后你解析这个结果, 调用你自己的函数.')

  yield* tts(字幕区域(), '我个人的经验是JSON模式最好用, 不用搞太多复杂的描述, 效果也不错.')

  yield* 清空(展示区域())
  yield* tts(字幕区域(), '当然, 上面这些控制大语言模型结果形状的方法都不是 100% 可靠的.')
  yield* tts(字幕区域(), '前后多字少字, JSON格式有微妙的小错误, 各种各样的问题都有可能发生.')
  yield* tts(字幕区域(), '所以实际使用时还需要配合其他的检查, 修复, 重试机制.')

  yield* 清空(展示区域())
  yield* 小节标题组件(展示区域(), 'MCP')
  yield* tts(字幕区域(), 'MCP协议试图标准化"给大语言模型提供上下文"这件事.')
  yield* tts(字幕区域(), '是客户端/服务器模式, 客户端在必要的时候给服务器发送信息, 服务器返回数据.')
  yield* tts(字幕区域(), '我们使用大语言模型的地方, 比如桌面软件, vscode插件之类的, 都是客户端.')

  yield* tts(字幕区域(), '它设想了这样一种情况.')
  yield* 清空(展示区域())
  let 列表 = yield* 列表组件(
    展示区域(),
    ['- 客户端给MCP服务器发送报文.', '- MCP服务器就会执行行为, 返回数据.', '- 客户端收到了MCP服务器返回的数据, 加入上下文或做进一步处理.'],
    { 字体大小: 50 },
  )
  yield* 列表.下一个('左')
  yield* 列表.下一个('左')
  yield* 列表.下一个('左')

  yield* tts(字幕区域(), '首先客户端可以在适当的时机(由客户端自己决定), 给MCP服务器发送报文.')
  yield* tts(字幕区域(), 'MCP服务器会依据报文, 按自己的逻辑执行某些行为, 并返回数据.')
  yield* tts(字幕区域(), '最后, 我们的客户端收到了MCP服务器返回的数据.')
  yield* tts(字幕区域(), '这些数据就会由客户端自己处理, 有可能加入对话的上下文, 也有可能进行进一步的处理等.')

  yield* 清空(展示区域())
  列表 = yield* 列表组件(
    展示区域(),
    [
      '- 客户端发给服务器的报文是什么样?',
      '- 服务器返回客户端的报文是什么样?',
      '- 一共有多少种报文?',
      '- 客户端和服务端之间是通过什么方式连接的?',
      '- 连接出错时的错误码?',
      '- ...',
    ],
    { 高度: 500 },
  )
  yield* 列表.下一个('左')
  yield* 列表.下一个('左')
  yield* 列表.下一个('左')
  yield* 列表.下一个('左')
  yield* 列表.下一个('左')
  yield* 列表.下一个('左')
  yield* tts(字幕区域(), 'MCP就是去规定, 例如:')
  yield* tts(字幕区域(), '客户端发给服务器的报文是什么样? 服务器返回客户端的报文是什么样? ')
  yield* tts(字幕区域(), '一共有多少种报文? 客户端和服务端之间是通过什么方法连接的?')
  yield* tts(字幕区域(), '类似这样的问题.')

  yield* 清空(展示区域())
  yield* tts(字幕区域(), 'MCP只是一个协议, 规定客户端和服务器如何连接, 如何沟通, 出错了要怎么办, 之类的.')
  yield* tts(字幕区域(), '具体客户端和服务器的逻辑是如何的, 和协议本身没有关系.')
  yield* tts(字幕区域(), '就像HTTP协议规定了HTTP报文的格式, 有GET, POST之类的方法, 每个方法的字段有什么.')
  yield* tts(字幕区域(), '但没有规定网页的什么按钮被点击后, 要发送什么信息给服务器, 这些是客户端自己决定的.')

  yield* 清空(展示区域())
  yield* tts(字幕区域(), '在开始详细介绍前, 我必须要指出, 虽然现在MCP协议和"给大语言模型提供外部工具"紧密相连.')
  yield* tts(字幕区域(), '但提供外部工具只是MCP规定的一部分内容. MCP还规定了除工具外的其他能力.')

  yield* 清空(展示区域())
  yield* tts(字幕区域(), '那么, 规定了哪些通信方式呢?')
  列表 = yield* 列表组件(展示区域(), ['- 资源(Resources)', '- 提示词(Prompts)', '- 工具(Tools)', '- 采样(Sampling)', '- 根(Roots)'], {
    字体大小: 50,
  })

  yield* 列表.下一个('左')
  yield* tts(字幕区域(), '首先是资源.')
  yield* tts(字幕区域(), '就类似HTTP的资源地址, 服务端可以将某种资源(文本, 调用结果, 二进制数据, 日志, ...)分配成一个地址.')
  yield* tts(字幕区域(), '客户端请求这个地址的时候(通过 resources/read 报文), 就会获得这个资源.')

  yield* 清空(代码区域())
  代码区域().add(
    <>
      <Rect width={'100%'} height={'100%'} fill={'#123456'} />
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={30}
        code={`
// https://modelcontextprotocol.io/docs/concepts/resources
// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "file:///logs/app.log",
        name: "Application Logs",
        mimeType: "text/plain"
      }
    ]
  };
});

// Read resource contents
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === "file:///logs/app.log") {
    const logContents = await readLogFile();
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: logContents
        }
      ]
    };
  }
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '这是一个MCP服务器的实现部分.')
  yield* tts(字幕区域(), '它通过 ListResourcesRequestSchema 设定了这个服务器的资源.')
  yield* tts(字幕区域(), '然后通过 ReadResourceRequestSchema 设定了当客户端请求某个资源的时候, 应该返回什么数据.')

  yield* 清空(代码区域())
  yield* 列表.下一个('左')
  yield* tts(字幕区域(), '服务器还可以提供一些提示词.')
  代码区域().add(
    <>
      <Rect width={'100%'} height={'100%'} fill={'#123456'} />
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={15}
        code={`
// https://modelcontextprotocol.io/docs/concepts/prompts
const PROMPTS = {
  "explain-code": {
    name: "explain-code",
    description: "Explain how code works",
    arguments: [
      {
        name: "code",
        description: "Code to explain",
        required: true
      },
      {
        name: "language",
        description: "Programming language",
        required: false
      }
    ]
  }
};

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: Object.values(PROMPTS)
  };
});

// Get specific prompt
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const prompt = PROMPTS[request.params.name];
  if (!prompt) {
    throw new Error(\`Prompt not found: \${request.params.name}\`);
  }

  if (request.params.name === "explain-code") {
    const language = request.params.arguments?.language || "Unknown";
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: \`Explain how this \${language} code works:\n\n\${request.params.arguments?.code}\`
          }
        }
      ]
    };
  }
}
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '这是一个定义提示词的服务器的例子.')
  yield* tts(字幕区域(), '和刚才的资源类似.')
  yield* tts(字幕区域(), '这里用 ListPromptsRequestSchema 描述了服务器有哪些提示词.')
  yield* tts(字幕区域(), '用 GetPromptRequestSchema 描述了当请求提示词的时候, 具体要返回什么.')

  yield* 清空(代码区域())
  代码区域().add(
    <>
      <Rect width={'100%'} height={'100%'} fill={'#123456'} />
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={20}
        code={`
// Request
{
  method: "prompts/get",
  params: {
    name: "analyze-code",
    arguments: {
      language: "python"
    }
  }
}

// Response
{
  description: "Analyze Python code for potential improvements",
  messages: [
    {
      role: "user",
      content: {
        type: "text",
        text: "Please analyze the following Python code for potential improvements:\n\n\`\`\`python\ndef calculate_sum(numbers):\n    total = 0\n    for num in numbers:\n        total = total + num\n    return total\n\nresult = calculate_sum([1, 2, 3, 4, 5])\nprint(result)\n\`\`\`"
      }
    }
  ]
}
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '这是一个调用的报文示例.')
  yield* tts(字幕区域(), 'Request 是客户端发出的报文.')
  yield* tts(字幕区域(), 'Response 是服务器返回的报文.')

  yield* 清空(代码区域())
  yield* 列表.下一个('左')
  yield* tts(字幕区域(), '然后就是最常见的工具了.')
  代码区域().add(
    <>
      <Rect width={'100%'} height={'100%'} fill={'#123456'} />
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={25}
        code={`
// https://modelcontextprotocol.io/docs/concepts/tools
// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [{
      name: "calculate_sum",
      description: "Add two numbers together",
      inputSchema: {
        type: "object",
        properties: {
          a: { type: "number" },
          b: { type: "number" }
        },
        required: ["a", "b"]
      }
    }]
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "calculate_sum") {
    const { a, b } = request.params.arguments;
    return {
      content: [
        {
          type: "text",
          text: String(a + b)
        }
      ]
    };
  }
  throw new Error("Tool not found");
});
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '工具也和上面的模式类似.')
  yield* tts(字幕区域(), '这里用 ListToolsRequestSchema 描述了服务器有哪些工具.')
  yield* tts(字幕区域(), '用 CallToolRequestSchema 描述了当请求调用工具的时候, 具体执行的代码.')

  yield* 清空(代码区域())
  yield* tts(字幕区域(), '注意, 这些东西是可以混在一起用的.')
  yield* tts(字幕区域(), '比如, 我完全可以在调用工具后, 将工具的结果保存为某个资源, 这个调用只返回空或者返回资源的地址.')
  yield* tts(字幕区域(), '然后客户端去请求那个资源获得结果. (虽然看上去有点多余)')
  yield* tts(字幕区域(), '总之, 服务器可以有服务器自己的状态, 自己的数据库等.')
  yield* tts(字幕区域(), '只要和客户端约定好, 就可以以约定的模式进行通信, MCP并不限制这些.')

  yield* 列表.下一个('左')
  yield* tts(字幕区域(), '采样规定的则是服务端要如何控制客户端进行模型调用.')
  yield* 清空(代码区域())
  代码区域().add(
    <>
      <Rect width={'100%'} height={'100%'} fill={'#123456'} />
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={30}
        code={`
// https://modelcontextprotocol.io/docs/concepts/sampling
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100
  }
}
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '这是一个报文的例子, 由服务器发给客户端.')
  yield* tts(字幕区域(), '这个报文本质上描述了一个大语言模型调用.')
  yield* tts(字幕区域(), '客户端应该实现这段逻辑, 一旦接收到 sampling/createMessage 报文, 就先让用户确认, 然后从客户端调用大语言模型.')

  yield* 清空(代码区域())
  代码区域().add(
    <>
      <Rect width={'100%'} height={'100%'} fill={'#123456'} />
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={30}
        code={`
{
  model: string,  // Name of the model used
  stopReason?: "endTurn" | "stopSequence" | "maxTokens" | string,
  role: "user" | "assistant",
  content: {
    type: "text" | "image",
    text?: string,
    data?: string,
    mimeType?: string
  }
}
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '然后将数据返回, 这是返回的报文格式.')

  yield* 清空(代码区域())
  yield* 列表.下一个('左')
  yield* tts(字幕区域(), '最后是根.')
  yield* tts(字幕区域(), '这是由客户端发给服务端的一段描述.')
  代码区域().add(
    <>
      <Rect width={'100%'} height={'100%'} fill={'#123456'} />
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={30}
        code={`
// https://modelcontextprotocol.io/docs/concepts/roots
{
  "roots": [
    {
      "uri": "file:///home/user/projects/frontend",
      "name": "Frontend Repository"
    },
    {
      "uri": "https://api.example.com/v1",
      "name": "API Endpoint"
    }
  ]
}
          `}
      />
    </>,
  )
  yield* tts(字幕区域(), '这是一个示例, 服务器在工作时应该参考这些描述, 例如不要意外操作到定义根目录之外的文件.')

  yield* 清空(展示区域())
  yield* 清空(代码区域())
  列表 = yield* 列表组件(代码区域(), ['- 标准输入输出(stdio)', '- 服务器事件(SSE)'], {
    字体大小: 50,
  })
  yield* 列表.下一个('左')
  yield* 列表.下一个('左')
  yield* tts(字幕区域(), '最后是通信的问题, 简单的说, 有两种模式.')
  yield* tts(字幕区域(), '标准输入输出方式比较适合简单的本地调用, 比如把MCP服务器运行在本机.')
  yield* tts(字幕区域(), '服务器事件方式比较适合远程调用, 比如别人给你提供了一个MCP服务器.')
  yield* tts(字幕区域(), '不过它也提供了自定义的方式, 只要按说明实现给定的接口, 你就可以自己实现通信机制.')

  yield* 清空(展示区域())
  yield* 清空(代码区域())
  yield* tts(字幕区域(), '差不多就是这样, 接下来我会在2p做一个简单的演示.')
})

export default makeProject({
  scenes: [我的视频],
  settings: {
    shared: { size: { x: 1920, y: 1080 } },
    // https://github.com/redotvideo/revideo/issues/182
    rendering: {
      exporter: { name: '@revideo/core/ffmpeg', options: { format: 'mp4' } },
    },
  },
})
