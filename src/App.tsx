import React, { FC, ReactElement, useState } from 'react';
import './App.css';
import { Button, Form, Input, Image } from 'antd';

export interface IDisplayBMI {
  result: string | undefined;
}

const DisplayBMI = ({ result }: IDisplayBMI): ReactElement => {
  return (
    <div className="displayBMI text-center">
      <div className="alert alert-info">{result}</div>
    </div>
  );
};

const BodyForm: FC = () => {
  const [displayBMI, setDisplayBMI] = useState<string | undefined>('');
  const [state, setState] = useState<{ myWeight: number; myHeight: number }>({
    myWeight: 0,
    myHeight: 0,
  });
  const [form] = Form.useForm();

  function updateDisplayBMI() {
    const msg = doCalc();
    setDisplayBMI(msg);
  }

  function resetDisplayBMI() {
    setDisplayBMI('');
    setState({ ...state, myHeight: 0 });
    setState({ ...state, myWeight: 0 });
  }

  function doCalc() {
    let finalBmi =
      state.myWeight / (((state.myHeight / 100) * state.myHeight) / 100);
    if (!(state.myWeight > 0 && state.myHeight > 0))
      return 'Please Fill in everything correctly';
    if (finalBmi < 18.5) {
      return 'That you are too thin.';
    }
    if (finalBmi > 18.5 && finalBmi < 25) {
      return 'That you are healthy.';
    }
    if (finalBmi > 25) {
      return 'That you have overweight.';
    }
  }

  function handleOnFinish() {
    updateDisplayBMI();
  }

  return (
    <div className="w-full">
      {displayBMI && <DisplayBMI result={displayBMI} />}
      <Form
        name="bmi"
        form={form}
        className="bodyForm mt-4"
        onFinish={handleOnFinish}
        layout="vertical"
      >
        <Form.Item
          label="Weight"
          name="weight"
          rules={[{ required: true, message: 'Please input your weight!' }]}
          className="mb-4"
        >
          <Input
            type="number"
            onChange={(evt) =>
              setState({ ...state, myWeight: Number(evt.target.value) })
            }
            placeholder="Your weight in kg. Ex: 68"
            className="px-4 py-2 border border-gray-200 rounded-full w-full"
          />
        </Form.Item>
        <Form.Item
          label="Height"
          name="height"
          rules={[{ required: true, message: 'Please input your height!' }]}
          className="mb-4"
        >
          <Input
            type="number"
            onChange={(evt) =>
              setState({ ...state, myHeight: Number(evt.target.value) })
            }
            placeholder="Yout height in cm. Ex: 160"
            className="px-4 py-2 border border-gray-200 rounded-full w-full"
          />
        </Form.Item>
        <div className="grid grid-cols-2 gap-3 mt-8">
          <Form.Item>
            <Button
              type="default"
              htmlType="button"
              onClick={() => {
                resetDisplayBMI();
                form.resetFields();
              }}
              className="w-full rounded-full"
              size="large"
            >
              Reset
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-full"
              size="large"
            >
              Calculate
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

function App() {
  return (
    <div className="container mx-auto max-w-sm px-4 relative flex flex-col justify-center items-center h-full">
      <Image
        src={`/body.svg?q=35`}
        width={100}
        height={100}
        alt="body"
        preview={false}
      />
      <h3 className="mt-8 mb-4 text-2xl">BMI CALCULATOR</h3>
      <BodyForm />
    </div>
  );
}

export default App;
